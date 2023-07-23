import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        message: 'flash-card api version-1 says hello!',
        data: {},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to flash-card api v1',
        error: error,
      },
      { status: 500 }
    );
  }
}
