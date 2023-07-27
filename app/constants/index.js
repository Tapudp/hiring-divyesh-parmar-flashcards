const currentSystemUserId = 1;
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

const ALLOWED_WRONG_ATTEMPTS = 10;
const HIGHEST_BIN = 11;

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

const STUDENT_DEFAULT_STATE = {
  reviewWords: [],
  currentReviewStatus: '',
  showDefinition: false,
};

const reviewStatus = {
  temporary: 'TEMPORARY_DONE',
  permanent: 'PERMANENT_DONE',
};

const reviewStatusText = {
  [reviewStatus.temporary]:
    'You are temporarily done; please come back later to review more words.',
  [reviewStatus.permanent]: 'You have no more words to review; you are permanently done!',
};

const actionMessages = {
  NO_DETAILS: 'Word Details are not provided clearly',
  WORD_EXISTS: 'The same word already exists in the system',
  CREATE_SUCCESS: 'Word created successfully',
  CREATE_ERROR: 'There was an error while creating the word',
  UPDATE_SUCCESS: 'Word updated successfully',
  UPDATE_ERROR: 'There was an error while updating the word',
  DELETE_SUCCESS: 'Word deleted successfully',
  DELETE_ERROR: 'There was an error while deleting the word',
  REVIEW_SUCCESS: 'Review submitted successfully',
  REVIEW_ERROR: 'There was an error while submitting the review',
};

const constants = {
  ALLOWED_WRONG_ATTEMPTS,
  HIGHEST_BIN,
  TIMESPANS,
  USERS,
  ADMIN_DEFAULT_STATE,
  MODES,
  actionMessages,
  STUDENT_DEFAULT_STATE,
  reviewStatusText,
  reviewStatus,
  currentSystemUserId,
};

export default constants;
