'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import logger from '../helpers/logger';
import constants from '../constants';
import Error from 'next/error';

const StudentContext = createContext({
  value: constants.STUDENT_DEFAULT_STATE,
});

// Provider
const StudentProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [studentState, setStudentState] = useState(constants.STUDENT_DEFAULT_STATE);
  const [isOngoing, setOngoing] = useState(false);

  const updateReview = async (wordObject) => {
    setOngoing(true);

    if (!wordObject) {
      return constants.actionMessages.NO_DETAILS;
    }

    setStudentState((prev) => {
      const newList = prev.reviewWords.filter((_, idx) => idx !== 0);

      return {
        ...prev,
        showDefinition: false,
        currentReviewStatus: newList.length === 0 ? constants.reviewStatuses.TEMPORARY_DONE : '',
        reviewWords: newList,
      };
    });

    setOngoing(false);
    return Promise.resolve(constants.actionMessages.REVIEW_SUCCESS);
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
