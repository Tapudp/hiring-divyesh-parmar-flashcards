import constants from '../constants';
import logger from './logger';

export default async function triggerAdditionToReviewTable(wordDetails, currentConnection) {
  try {
    const { wordId, word, definition } = wordDetails;
    const initialBin = 0;
    const intialWrongAttempts = 0;

    const sql = `
    INSERT INTO reviews (word_id, user_id, bin, time_to_next_appearance, wrong_attempts) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
      wordId,
      constants.currentSystemUserId,
      initialBin,
      constants.TIMESPANS[initialBin],
      intialWrongAttempts,
    ];

    const [updateDetails] = await currentConnection.query(sql, values);
    if (updateDetails.affectedRows > 0) {
      return Promise.resolve({
        success: true,
        message: 'Word has been added to the review table',
        affectedRows: updateDetails.affectedRows,
      });
    }

    return Promise.reject({
      success: false,
      message: 'There was some error while adding word to review table',
      data: null,
    });
  } catch (error) {
    logger.error('trigger addition to review table :: error :: ', error);
    return Promise.reject({
      success: false,
      message: 'There was some error while adding word to review table',
      data: null,
    });
  }
}
