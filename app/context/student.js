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
        answer: answer,
        wordId: wordObject.word_id,
        wrongAttempts: wordObject.wrong_attempts,
        bin: wordObject.bin,
      }),
      cache: 'no-store',
    })
      .then(async (response) => {
        const { success, message, data } = await response.json();

        if (!success) {
          return Promise.reject(message);
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
        return Promise.resolve(message);
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {
        setOngoing(false);
      });
  };

  const toggleDefinition = (value) =>
    setStudentState((prev) => ({ ...prev, showDefinition: value }));

  useEffect(() => {
    fetch('/api/v1/review', {
      cache: 'no-store',
    })
      .then(async (response) => {
        const { success, message, data } = await response.json();
        setStudentState((prev) => ({
          ...prev,
          reviewWords: data,
          currentReviewStatus: data.length === 0 ? constants.reviewStatusText[message] : '',
        }));
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
