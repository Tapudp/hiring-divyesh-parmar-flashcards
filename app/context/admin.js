'use client';
import Error from 'next/error';
import { createContext, useContext, useEffect, useState } from 'react';
import constants from '../constants';
import logger from '../helpers/logger';

const AdminContext = createContext({
  value: constants.ADMIN_DEFAULT_STATE,
});

// Provider
const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [adminState, setAdminState] = useState(constants.ADMIN_DEFAULT_STATE);
  const [isOngoing, setOngoing] = useState(false);

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
    setOngoing(true);
    return fetch(`/api/v1/word/${adminState.selectedWord.id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
      .then(async (response) => {
        const { success, message } = await response.json();
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
          return Promise.resolve(message);
        }
        return Promise.reject(message);
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {
        setOngoing(false);
      });
  };

  const createWord = (wordObject) => {
    setOngoing(true);
    if (!wordObject || !wordObject.word || !wordObject.definition)
      return constants.actionMessages.NO_DETAILS;

    const currentListOfWords = adminState.listOfWords.map((item) => item.word);

    if (currentListOfWords.includes(wordObject.word)) return constants.actionMessages.WORD_EXISTS;

    return fetch(`/api/v1/word`, {
      method: 'POST',
      body: JSON.stringify({ ...wordObject }),
      cache: 'no-store',
    })
      .then(async (response) => {
        const { success, message, data } = await response.json();
        if (success) {
          const newWord = {
            id: data.newWordId,
            word: wordObject.word,
            definition: wordObject.definition,
          };
          setAdminState((prev) => {
            const currentList = [...prev.listOfWords];
            // adding the element in the beginning
            currentList.unshift(newWord);

            return {
              ...prev,
              selectedWord: null,
              listOfWords: [...currentList],
            };
          });
          return Promise.resolve(message);
        }
        return Promise.reject(message);
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {
        setOngoing(false);
      });
  };

  const updateWord = (wordObject) => {
    setOngoing(true);
    if (!wordObject || !wordObject.word || !wordObject.definition) {
      return Promise.reject(constants.actionMessages.NO_DETAILS);
    }

    return fetch(`/api/v1/word/${adminState.selectedWord.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...wordObject }),
      cache: 'no-store',
    })
      .then(async (response) => {
        const { success, message } = await response.json();
        if (!success) {
          return Promise.reject(message);
        }
        setAdminState((prev) => {
          const newListWitUpdate = prev.listOfWords.map((item) => {
            if (item.id === wordObject.id) {
              return { ...wordObject };
            }
            return item;
          });

          return {
            ...prev,
            selectedWord: { ...wordObject },
            listOfWords: [...newListWitUpdate],
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

  const switchToEditMode = () =>
    setAdminState((prev) => ({ ...prev, mode: constants.MODES.create }));

  const switchToCreateMode = () =>
    setAdminState((prev) => ({ ...prev, mode: constants.MODES.create, selectedWord: null }));

  const switchToDefaultMode = () =>
    setAdminState((prev) => ({ ...prev, mode: constants.MODES.none }));

  useEffect(() => {
    fetch('/api/v1/words', {
      cache: 'no-store',
    })
      .then(async (response) => {
        const { success, message, data } = await response.json();
        setAdminState((prev) => ({ ...prev, listOfWords: data }));
      })
      .catch((error) => {
        alert('There was error while fetching all the words. You can try after some time.');
        return Promise.reject('There was error fetching all words');
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
        switchToEditMode,
        switchToCreateMode,
        switchToDefaultMode,
        createWord,
        updateWord,
        isAnyProcessOngoing: isOngoing,
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
