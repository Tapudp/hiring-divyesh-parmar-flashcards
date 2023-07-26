const aSecond = 1 * 1000;
const TIMESPANS = {
  0: 0,
  1: 5, // 5 seconds
  2: 25, // 25 seconds
  3: 2 * 60, // 2 minutes
  4: 10 * 60, // 10 minutes
  5: 1 * 60 * 60, // 1 hour
  6: 5 * 60 * 60, // 5 hours
  7: 1 * 24 * 60 * 60, // 1 day
  8: 5 * 24 * 60 * 60, // 5 days
  9: 25 * 24 * 60 * 60, // 25 days
  10: 4 * 30 * 24 * 60 * 60, // 4 months
  11: -1, // Never
};

const USERS = {
  ADMIN: 'admin',
  STUDENT: 'student',
};

const MODES = {
  edit: 'EDIT',
  create: 'CREATE',
  none: '',
};

const ADMIN_DEFAULT_STATE = {
  selectedWord: null,
  mode: MODES.none, // edit | create,
  listOfWords: [],
};

const constants = {
  TIMESPANS,
  USERS,
  ADMIN_DEFAULT_STATE,
  MODES,
};

export default constants;
