import { connect, disconnect } from '@/app/db/connection';
import { NextResponse } from 'next/server';

async function POST(req, res) {
  try {
    const connection = await connect();
    const { word, definition } = req.body;
    const sql = `INSERT INTO words (word, definition) VALUES (?, ?)`;

    const values = [word, definition];
    const result = await connection.query(sql, values);

    await disconnect(connection);
    return NextResponse.json({ data: result, ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ ...error, ok: false }, { status: 500 });
  }
}

export { POST };
