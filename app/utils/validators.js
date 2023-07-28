import constants from '../constants';
const conditions = {
  wordId: (value) => {
    return typeof value === 'number' && !isNaN(value);
  },
  wrongAttempts: (value) => {
    return typeof value === 'number' && !isNaN(value);
  },
  bin: (value) => {
    return typeof value === 'number' && !isNaN(value) && value <= 11;
  },
  answer: (value) => {
    return typeof value === 'boolean';
  },
  word: (value) => {
    return (
      typeof value === 'string' &&
      isNaN(value) &&
      value.length <= 255 &&
      constants.validWordRegex.test(value)
    );
  },
  definition: (value) => {
    return (
      typeof value === 'string' &&
      isNaN(value) &&
      value.length <= 255 &&
      constants.validWordRegex.test(value)
    );
  },
};

const validators = {
  conditions,
};

export default validators;
