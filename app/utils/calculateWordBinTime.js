import constants from '@/app/constants';

/**
 *
 * @param {*} word - reviewed word
 * {
 *  id - review-id
 *  word-id,
 *  user-id,
 *  bin,
 *  time_to_next_appear,
 *  wrong_attempts
 * }
 * @param {*} answer - BOOLEAN
 * @returns
 */
export default function calculateWordBinAndTime({ wrongAttempts, bin, answer }) {
  let newAttemptsCount;
  let newBin;
  let timeToNextAppearance;

  /**
   * this bin would be
   * incremented by 1 (correct answer)
   * OR
   * put to 1 (wrong answer)
   * depending on the answer
   */
  if (!answer) {
    newAttemptsCount = wrongAttempts + 1;
    newBin = 1;
  } else {
    newAttemptsCount = wrongAttempts;
    newBin = bin + 1;
  }
  const unixTimestamp = new Date().getTime() / 1000;
  timeToNextAppearance = unixTimestamp + constants.TIMESPANS[newBin];

  return { newAttemptsCount, newBin, timeToNextAppearance };
}
