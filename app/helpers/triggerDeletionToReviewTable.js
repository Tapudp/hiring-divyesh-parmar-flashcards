import logger from './logger';

export default async function triggerDeletionToReviewTable(wordDetails, currentConnection) {
  try {
    const { wordId } = wordDetails;

    const sql = `UPDATE reviews
        SET is_deleted = 1
        WHERE word_id = ?;
    `;
    const values = [wordId];

    const [updateDetails] = await currentConnection.query(sql, values);
    if (updateDetails.affectedRows > 0) {
      return Promise.resolve({
        success: true,
        message: 'Word has been deleted from the review table',
        affectedRows: updateDetails.affectedRows,
      });
    }

    return Promise.reject({
      success: false,
      message: 'There was some error while deleting word from reviews table',
      data: null,
    });
  } catch (error) {
    logger.error('trigger deletion from review table :: error :: ', error);
    return Promise.reject({
      success: false,
      message: 'There was some error while deleting word from reviews table',
      data: null,
    });
  }
}
