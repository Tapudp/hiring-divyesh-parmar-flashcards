import { connect, disconnect } from '@/app/db/connection';
import logger from '@/app/helpers/logger';
import { NextResponse } from 'next/server';

export async function GET(_, requestDetails) {
  try {
    const connection = await connect();
    const {
      params: { id },
    } = requestDetails;

    const sql = `SELECT * FROM words WHERE id = ?`;
    const values = [id];

    const [rows] = await connection.query(sql, values);

    await disconnect(connection);

    logger.info(' success : word : get :: ', id, rows);
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
    logger.error(' failed : word : get :: ', id, error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch the word',
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(requestBody, requestDetails) {
  try {
    const connection = await connect();
    const {
      params: { id },
    } = requestDetails;
    const { word, definition } = await requestBody.json();

    const sql = `
      UPDATE words
      SET word = COALESCE(?, word),
      definition = COALESCE(?, definition)
      WHERE id = ?
    `;
    const values = [word, definition, id];

    const [updateDetails] = await connection.query(sql, values);
    const { affectedRows } = updateDetails;

    await disconnect(connection);
    logger.info(' success : word : edit :: ', id, updateDetails);
    return NextResponse.json(
      {
        success: true,
        message: 'Updated the word successfully',
        data: { affectedRows, id },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error(' failed : word : delete :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update the word',
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_, requestDetails) {
  try {
    const connection = await connect();

    const {
      params: { id },
    } = requestDetails;
    const sql = `DELETE FROM words WHERE id = ?`;
    const values = [id];

    const [updateDetails] = await connection.query(sql, values);
    const { affectedRows } = updateDetails;

    await disconnect(connection);
    logger.info(' success : word : delete :: ', id, updateDetails);
    return NextResponse.json(
      {
        success: true,
        message: 'Deleted the word successfully',
        data: { affectedRows, id },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error(' failed : word : delete :: ', id, error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete the word',
        error: error,
      },
      { status: 500 }
    );
  }
}
