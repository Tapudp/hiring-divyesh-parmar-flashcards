import logger from '@/app/helpers/logger';
import { connect, disconnect } from '../../../db/connection';
import { NextResponse } from 'next/server';

export const revalidate = 1; //revalidate api every 1 second
async function GET() {
  try {
    const connection = await connect();

    const sql = `
      SELECT *
      FROM words
      WHERE is_deleted = 0
      ORDER BY id DESC;
    `;
    const [rows] = await connection.query(sql);

    await disconnect(connection);

    logger.info('words : get : success :: ', rows.length);

    return NextResponse.json(
      {
        success: true,
        message: 'Fetched all words successfully',
        data: rows,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('words : get : failed :: ', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export { GET };
