import { connect, disconnect } from '@/app/db/connection';
import logger from '@/app/helpers/logger';
import triggerAdditionToReviewTable from '@/app/helpers/triggerAdditionToReviewTable';
import validateRequest from '@/app/helpers/validate-request';
import utils from '@/app/utils';
import { NextResponse } from 'next/server';

export const revalidate = 1; //revalidate api every 1 second
export async function POST(requestBody) {
  let statusCode = 500;
  try {
    const connection = await connect();

    const { word, definition } = await requestBody.json();

    const { isValid: isValidRequest, fieldName } = validateRequest(
      { word, definition },
      utils.validators.conditions
    );

    if (!isValidRequest) {
      statusCode = 400;
      throw new Error(`request is not valid for ${fieldName}`);
    }

    const sql = `INSERT INTO words (word, definition) VALUES (?, ?)`;
    const values = [word, definition];

    const [updateDetails] = await connection.query(sql, values);

    let result;
    if (updateDetails.affectedRows > 0) {
      result = await triggerAdditionToReviewTable(
        {
          wordId: updateDetails.insertId,
          word,
          definition,
        },
        connection
      );
    } else {
      throw new Error(`There was some error to update rows :: ${JSON.stringify(updateDetails)}`);
    }

    await disconnect(connection);
    logger.info('word :: POST :: success :: ', result);
    return NextResponse.json(
      {
        success: true,
        message: 'Created new word successfully',
        data: { ...result, newWordId: updateDetails.insertId },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error('word :: POST :: failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create a new word',
        error: error.message,
      },
      { status: statusCode }
    );
  }
}
