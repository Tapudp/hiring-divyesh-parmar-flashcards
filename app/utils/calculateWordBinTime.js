export default function calculateWordBinAndTime(word) {
  const bin = word.incorrect_count === 0 ? 0 : 1;
  const timeToNextAppearance = TIMESPANS[bin];

  return { bin, timeToNextAppearance };
}
