import constants from '../constants';

export default async function subsequentGetReviewQueryHelper(currentDataRows, currentConnection) {
  let result = {
    rows: currentDataRows,
    message: constants.reviewStatus.temporary,
  };

  if (currentDataRows.length !== 0) {
    return result;
  }

  const secondQuery = `
          SELECT reviews.id, reviews.word_id, reviews.wrong_attempts, reviews.bin, reviews.time_to_next_appearance,
            words.word AS word, words.definition AS definition
          FROM reviews
          LEFT JOIN words ON reviews.word_id = words.id
          WHERE wrong_attempts != ? AND bin < ?
          ORDER BY bin DESC
        `;
  const secondQueryValues = [constants.ALLOWED_WRONG_ATTEMPTS, constants.HIGHEST_BIN];
  const [secondReviewsData] = await currentConnection.query(secondQuery, secondQueryValues);

  /**
   * if there is no data in second query
   * it means that all words are reviews
   * and done permanently
   *
   * else we don't want to show data from the second query to the client
   * as it means there is data available that will be fetched in future
   * based on approrpriate time-stamp
   */
  if (secondReviewsData.length === 0) {
    result = {
      rows: [],
      message: constants.reviewStatus.permanent,
    };
  }

  return result;
}
