import { connect, disconnect } from '@/app/db/connection';
import { NextResponse } from 'next/server';

export async function POST(requestBody) {
  try {
    const connection = await connect();

    const { word, definition } = await requestBody.json();
    const sql = `INSERT INTO words (word, definition) VALUES (?, ?)`;
    const values = [word, definition];

    const [row, fields] = await connection.query(sql, values);

    await disconnect(connection);

    return NextResponse.json({ data: { row: row, fields: fields } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
