import { NextResponse } from 'next/server';
import logger from '../helpers/logger';

export const revalidate = 1; //revalidate api every 1 second
export async function GET() {
  try {
    logger.info('api :: get :: success :: ');
    return NextResponse.json(
      {
        success: true,
        message: 'knock-knock flash-card api',
        data: {},
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('api :: get :: failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
