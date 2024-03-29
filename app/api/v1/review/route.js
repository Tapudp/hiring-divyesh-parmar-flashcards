import constants from '@/app/constants';
import { connect, disconnect } from '@/app/db/connection';
import logger from '@/app/helpers/logger';
import subsequentGetReviewQueryHelper from '@/app/helpers/subsequentGetReviewQueryHelper';
import { default as validateRequest } from '@/app/helpers/validate-request';
import utils from '@/app/utils';
import { NextResponse } from 'next/server';

export const revalidate = 1; //revalidate api every 1 second
export async function GET() {
  try {
    const connection = await connect();
    // current unix time stamp in seconds
    const currentUnixTimeSeconds = Math.floor(new Date().getTime() / 1000);
    const sql = `
        SELECT reviews.id, reviews.word_id, reviews.wrong_attempts, reviews.bin, reviews.time_to_next_appearance,
          words.word AS word, words.definition AS definition
        FROM reviews
        LEFT JOIN words ON reviews.word_id = words.id
        WHERE wrong_attempts != ?
          AND bin < ?
          AND time_to_next_appearance <= ?
          AND words.is_deleted = 0
          AND reviews.is_deleted = 0
        ORDER BY bin DESC
      `;
    const values = [
      constants.ALLOWED_WRONG_ATTEMPTS,
      constants.HIGHEST_BIN,
      currentUnixTimeSeconds,
    ];
    const [rows] = await connection.query(sql, values);
    const result = await subsequentGetReviewQueryHelper(rows, connection);
    await disconnect(connection);
    logger.info('review : get : success :: ', result.rows.length);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.info('review : get : failed :: ', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(requestBody) {
  let statusCode = 500;
  try {
    const connection = await connect();
    const { wrongAttempts, bin, wordId, answer } = await requestBody.json();

    const { isValid: isValidRequest, fieldName } = validateRequest(
      { wrongAttempts, bin, wordId, answer },
      utils.validators.conditions
    );

    if (!isValidRequest) {
      statusCode = 400;
      throw new Error(`request is not valid for ${fieldName}`);
    }

    // update that particular review-id and word-id with a new (bin+1) and time_to_next_appearanace
    const sql = `
            UPDATE reviews
            SET wrong_attempts = ?,
            bin = ?,
            time_to_next_appearance = COALESCE(?, time_to_next_appearance)
            WHERE word_id = ?;
        `;

    const { newAttemptsCount, newBin, timeToNextAppearance } = utils.calculateWordBinTime({
      wrongAttempts,
      bin,
      answer,
    });

    const values = [newAttemptsCount, newBin, timeToNextAppearance, wordId];

    const [rows] = await connection.query(sql, values);

    await disconnect(connection);
    statusCode = 200;
    logger.info('review : put : success :: ', rows.affectedRows);
    return NextResponse.json(
      {
        success: true,
        message: 'Updated review for word successfully',
        data: rows,
      },
      { status: statusCode }
    );
  } catch (error) {
    logger.info('review : put : failed :: ', error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: statusCode }
    );
  }
}
