import { connect, disconnect } from '@/app/db/connection';
import logger from '@/app/helpers/logger';
import triggerAdditionToReviewTable from '@/app/helpers/triggerAdditionToReviewTable';
import { NextResponse } from 'next/server';

export async function POST(requestBody) {
  try {
    const connection = await connect();

    const { word, definition } = await requestBody.json();
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
    }

    await disconnect(connection);
    logger.info(' word :: POST :: success :: ', result);
    return NextResponse.json(
      {
        success: true,
        message: 'Created new word successfully',
        data: { ...result },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create a new word',
        error: error,
      },
      { status: 500 }
    );
  }
}
