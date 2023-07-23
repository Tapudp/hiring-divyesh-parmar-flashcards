import { connect, disconnect } from '@/app/db/connection';
import { NextResponse } from 'next/server';

export async function GET(_, request) {
  try {
    const connection = await connect();
    const sql = `SELECT * FROM words WHERE id = ?`;
    const values = [request.params.id];

    const [rows] = await connection.query(sql, values);

    await disconnect(connection);

    return NextResponse.json(
      {
        success: true,
        message: 'Fetched the word successfully',
        data: rows,
      },
      { status: 200 }
    );
  } catch (error) {
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

    const sql = `UPDATE words SET word = ?, definition = ? WHERE id = ?`;
    const values = [word, definition, id];

    const [updateDetails] = await connection.query(sql, values);
    const { affectedRows } = updateDetails;

    await disconnect(connection);

    return NextResponse.json(
      {
        success: true,
        message: 'Updated the word successfully',
        data: { affectedRows },
      },
      { status: 200 }
    );
  } catch (error) {
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
    return NextResponse.json(
      {
        success: true,
        message: 'Deleted the word successfully',
        data: { affectedRows },
      },
      { status: 200 }
    );
  } catch (error) {
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
