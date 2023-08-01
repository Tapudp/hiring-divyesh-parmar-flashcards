import logger from '@/app/helpers/logger';
import { NextResponse } from 'next/server';

export const revalidate = 1; //revalidate api every 1 second
export async function GET() {
  try {
    logger.info('v1 :: get :: success :: ');
    return NextResponse.json(
      {
        success: true,
        message: 'flash-card api version-1 says hello!',
        data: {},
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('v1 :: get :: failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
