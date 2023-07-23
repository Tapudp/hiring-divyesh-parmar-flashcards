import logger from '@/app/helpers/logger';
import { connect, disconnect } from '../../../db/connection';
import { NextResponse } from 'next/server';

async function GET() {
  try {
    const connection = await connect();
    const [rows] = await connection.execute('SELECT * FROM words');

    if (rows.length > 0) {
      logger.info('fetched data successfully');
    }

    await disconnect(connection);
    return NextResponse.json(
      {
        success: true,
        message: 'Fetched all words successfully',
        data: rows,
      },
      { status: 200 }
    );
  } catch (error) {
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
