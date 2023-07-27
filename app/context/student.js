'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import constants from '../constants';
import logger from '../helpers/logger';

const StudentContext = createContext({
  value: constants.STUDENT_DEFAULT_STATE,
});

// Provider
const StudentProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [studentState, setStudentState] = useState(constants.STUDENT_DEFAULT_STATE);
  const [isOngoing, setOngoing] = useState(false);

  const updateReview = async (wordObject, answer) => {
    setOngoing(true);

    if (!wordObject) {
      return constants.actionMessages.NO_DETAILS;
    }

    return fetch('/api/v1/review', {
      method: 'PUT',
      body: JSON.stringify({
        reviewedWord: { ...wordObject },
        answer,
      }),
    })
      .then(async (response) => {
        const { success, message, data } = await response.json();

        if (!success) {
          return Promise.reject(constants.actionMessages.REVIEW_ERROR);
        }

        setStudentState((prev) => {
          const newList = prev.reviewWords.filter((_, idx) => idx !== 0);

          return {
            ...prev,
            showDefinition: false,
            currentReviewStatus:
              newList.length === 0 ? constants.reviewStatusText.TEMPORARY_DONE : '',
            reviewWords: newList,
          };
        });
        return Promise.resolve(constants.actionMessages.REVIEW_SUCCESS);
      })
      .catch((error) => {
        logger.error('There was some error while updating the review of the word', error);
        return Promise.reject(constants.actionMessages.REVIEW_ERROR);
      })
      .finally(() => {
        setOngoing(false);
      });
  };

  const toggleDefinition = (value) =>
    setStudentState((prev) => ({ ...prev, showDefinition: value }));

  useEffect(() => {
    fetch('/api/v1/review')
      .then(async (response) => {
        const { success, message, data } = await response.json();
        setStudentState((prev) => ({ ...prev, reviewWords: data }));
      })
      .catch((error) => {
        logger.error('Student layout failed to fetch words to review :: ', error);
        alert('There was an error while fetching all the words to review');
        return Promise.reject('There was error fetching all words to review');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <StudentContext.Provider
      value={{
        studentState,
        isStudentContentLoading: loading,
        updateReview,
        isProcessOngoing: isOngoing,
        toggleDefinition,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// Consumer
const useStudentContext = () => {
  const value = useContext(StudentContext);
  return value;
};

export { StudentProvider, useStudentContext };
