import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ message: 'flash-card api version-1 says hello!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ...error }, { status: 500 });
  }
}
