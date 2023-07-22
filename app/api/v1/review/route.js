import logger from '@/app/helpers/logger';
import utils from '@/app/utils';
import { NextResponse } from 'next/server';
import { connect, disconnect } from '@/app/db/connection';

export async function GET() {
  try {
    const connection = await connect();
    const sql = `
      SELECT *
      FROM reviews
      LEFT JOIN words ON reviews.word_id = words.id
      WHERE wrong_attempts != 10 AND time_to_next_appearance <= UNIX_TIMESTAMP()
      ORDER BY bin DESC;
      `;

    const [rows] = await connection.query(sql);
    await disconnect(connection);

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(requestBody) {
  try {
    const connection = await connect();
    const { reviewedWord, answer } = await requestBody.json();

    // update that particular review-id and word-id with a new (bin+1) and time_to_next_appearanace
    const sql = `
            UPDATE reviews
            SET wrong_attempts = ?, bin = ?, time_to_next_appearance = ? 
            WHERE word_id = ?;
        `;

    const { newAttemptsCount, newBin, timeToNextAppearance } = utils.calculateWordBinTime(
      reviewedWord,
      answer
    );
    const unixTimestamp = new Date().getTime() / 1000;
    const totalTimeInSeconds = unixTimestamp + timeToNextAppearance;

    const values = [newAttemptsCount, newBin, totalTimeInSeconds, reviewedWord.word_id];
    logger.error(' time to next appear :: ', values);

    const [rows] = await connection.query(sql, values);

    await disconnect(connection);
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
