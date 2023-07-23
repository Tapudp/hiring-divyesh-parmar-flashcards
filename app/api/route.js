import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        message: 'knock-knock flash-card api',
        data: {},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to flash-card api',
        error: error,
      },
      { status: 500 }
    );
  }
}
