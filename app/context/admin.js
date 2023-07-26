'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import logger from '../helpers/logger';
import constants from '../constants';
import Error from 'next/error';

const AdminContext = createContext({
  value: constants.ADMIN_DEFAULT_STATE,
});

// Provider
const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [adminState, setAdminState] = useState(constants.ADMIN_DEFAULT_STATE);

  const pickWord = (wordObject) => {
    if (adminState.selectedWord !== null && adminState.selectedWord.id === wordObject.id) {
      return;
    }
    setAdminState((prev) => ({
      ...prev,
      mode: constants.MODES.none,
      selectedWord: { ...wordObject },
    }));
  };

  const deleteWord = () => {
    fetch(`/api/v1/word/${adminState.selectedWord.id}`, {
      method: 'DELETE',
    })
      .then(async (response) => {
        const { success } = await response.json();
        if (success) {
          setAdminState((prev) => {
            const filteredList = prev.listOfWords.filter(
              (item) => item.id !== adminState.selectedWord.id
            );

            return {
              ...constants.ADMIN_DEFAULT_STATE,
              listOfWords: filteredList,
            };
          });
        }
      })
      .catch((error) => {
        console.log(
          'there was an error while deleting the word :: ',
          adminState.selectedWord.id,
          error
        );
      });
  };

  const switchToCreateMode = () =>
    setAdminState((prev) => ({ ...prev, mode: constants.MODES.create, selectedWord: null }));

  useEffect(() => {
    fetch('/api/v1/words')
      .then(async (response) => {
        const { success, message, data } = await response.json();
        setAdminState((prev) => ({ ...prev, listOfWords: data }));
      })
      .catch((error) => {
        logger.error('Admin layout failed to fetch words :: ', error);
        return new Error('There was error fetching all words');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        adminState,
        isAdminContentLoading: loading,
        pickWord,
        deleteWord,
        switchToCreateMode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Consumer
const useAdminContext = () => {
  const value = useContext(AdminContext);
  return value;
};

export { AdminProvider, useAdminContext };
