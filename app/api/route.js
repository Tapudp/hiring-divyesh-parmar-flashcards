import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    return NextResponse.json({ message: 'knock-knock flash-card api!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ...error }, { status: 500 });
  }
}
