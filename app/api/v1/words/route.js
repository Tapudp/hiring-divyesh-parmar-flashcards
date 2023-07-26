import logger from '@/app/helpers/logger';
import { connect, disconnect } from '../../../db/connection';
import { NextResponse } from 'next/server';

async function GET() {
  try {
    const connection = await connect();

    const sql = 'SELECT * FROM words ORDER BY id DESC';
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
    logger.info('words : get : fail :: ', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch all the words ',
        error: error,
      },
      { status: 500 }
    );
  }
}

export { GET };
