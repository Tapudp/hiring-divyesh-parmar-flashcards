import { connect, disconnect } from '@/app/db/connection';
import logger from '@/app/helpers/logger';
import triggerDeletionToReviewTable from '@/app/helpers/triggerDeletionToReviewTable';
import validateRequest from '@/app/helpers/validate-request';
import utils from '@/app/utils';
import { NextResponse } from 'next/server';

export const revalidate = 1; //revalidate api every 1 second
export async function GET(_, requestDetails) {
  try {
    const connection = await connect();
    const {
      params: { id },
    } = requestDetails;

    const sql = `
      SELECT *
      FROM words
      WHERE id = ?
      AND is_deleted = 0;
    `;
    const values = [id];

    const [rows] = await connection.query(sql, values);

    await disconnect(connection);

    logger.info('word : get : success :: ', id, rows);
    return NextResponse.json(
      {
        success: rows.length > 0,
        message:
          rows.length < 1 ? 'There was no word with this id' : 'Fetched the word successfully',
        data: rows,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('word : get : failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(requestBody, requestDetails) {
  let statusCode = 500;
  try {
    const connection = await connect();
    const {
      params: { id },
    } = requestDetails;
    const { word, definition } = await requestBody.json();

    const { isValid: isValidRequest, fieldName } = validateRequest(
      { word, definition },
      utils.validators.conditions
    );

    if (!isValidRequest) {
      statusCode = 400;
      throw new Error(`request is not valid for ${fieldName}`);
    }

    const sql = `
      UPDATE words
      SET word = COALESCE(?, word),
      definition = COALESCE(?, definition)
      WHERE id = ?
    `;
    const values = [word, definition, id];

    const [updateDetails] = await connection.query(sql, values);
    const { affectedRows } = updateDetails;
    statusCode = 200;

    await disconnect(connection);
    logger.info('word : edit : success :: ', id, updateDetails);
    return NextResponse.json(
      {
        success: true,
        message: 'Updated the word successfully',
        data: { affectedRows, id },
      },
      { status: statusCode }
    );
  } catch (error) {
    logger.error('word : edit :  failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: statusCode }
    );
  }
}

export async function DELETE(_, requestDetails) {
  try {
    const connection = await connect();

    const {
      params: { id },
    } = requestDetails;
    const sql = `
      UPDATE words
      SET is_deleted = 1
      WHERE id = ?;
    `;
    const values = [id];

    const [updateDetails] = await connection.query(sql, values);

    let result;
    if (updateDetails.affectedRows > 0) {
      result = await triggerDeletionToReviewTable(
        {
          wordId: id,
        },
        connection
      );
    } else {
      throw new Error(`There was some updat to update rows :: ${JSON.stringify(updateDetails)}`);
    }

    await disconnect(connection);
    logger.info('word : delete : success :: ', id, updateDetails);
    return NextResponse.json(
      {
        success: true,
        message: 'Deleted the word successfully',
        data: { affectedRows: updateDetails.affectedRows, id },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('word : delete : failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
