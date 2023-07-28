'use client';
import constants from '@/app/constants';
import { useAdminContext } from '@/app/context/admin';
import utils from '@/app/utils';
import React, { useState } from 'react';

export default function Creator() {
  const {
    adminState: { selectedWord },
    createWord,
    updateWord,
    switchToDefaultMode,
    isAnyProcessOngoing,
  } = useAdminContext();

  const [word, setWord] = useState(selectedWord ? selectedWord.word : '');
  const [definition, setDefitnition] = useState(selectedWord ? selectedWord.definition : '');

  const resetVariables = () => {
    setWord('');
    setDefitnition('');
  };

  const updaterType = {
    word: setWord,
    definition: setDefitnition,
  };

  const handleUpdate = (event, type) => {
    if (!event) {
      return;
    }
    if (event.target.value.length > 255) {
      return;
    }

    updaterType[type](event.target.value);
  };

  const updateExistingWord = async () => {
    const confirmed = confirm(`You are about to edit this word : ${selectedWord.word} to ${word}`);

    if (!confirmed) return;

    updateWord({ id: selectedWord.id, word, definition })
      .then((result) => {
        resetVariables();
        switchToDefaultMode();
        alert(result);
      })
      .catch((error) => alert(error));
  };

  const createNewWord = async () => {
    const confirmed = confirm(`You are about to create this word : ${word}`);

    if (!confirmed) return;

    createWord({ word, definition })
      .then((result) => {
        resetVariables();
        switchToDefaultMode();
        alert(result);
      })
      .catch((error) => alert(error));
  };

  const handleSubmit = async () => {
    if (!selectedWord) {
      return await createNewWord();
    }
    return await updateExistingWord();
  };

  const handleCancel = () => {
    resetVariables();
    switchToDefaultMode();
  };

  const conditionsForDisableButton = {
    wordLength: word.length === 0 && word.length < 256,
    definitionLength: definition.length === 0 && definition.length < 256,
    isAnyProcessOngoing,
    selectedWord: selectedWord
      ? word.trim().toLowerCase() === selectedWord.word.trim().toLowerCase() &&
        definition.trim().toLowerCase() === selectedWord.definition.trim().toLowerCase()
      : false,
  };

  return (
    <div className='grid grid-rows-2 gap-2 p-2 bg-lime-100'>
      <div className='grid grid-rows-3'>
        <div className='grid place-content-start text-4xl row-span-1'>
          {selectedWord !== null ? 'Edit word' : 'Create a new word'}
        </div>
        <div className='text-xs'>Maximum of 255 characters is supported</div>
        <div className='grid grid-cols-4 place-content-center row-span-1 items-center'>
          <label htmlFor='word-name' className='grid col-span-1'>
            Word
          </label>
          <input
            id='word-name'
            className='border border-2 rounded col-span-3 p-2 w-1/2'
            placeholder='word'
            onChange={(event) => handleUpdate(event, 'word')}
            value={word}
            disabled={isAnyProcessOngoing}
          />
        </div>
        <div className='grid grid-cols-4 row-span-1 items-center'>
          <label htmlFor='word-definition' className='grid col-span-1'>
            Definition
          </label>
          <textarea
            id='word-definition'
            className='border border-2 rounded col-span-3 p-2 resize-none'
            placeholder='provide the definition of the word'
            onChange={(event) => handleUpdate(event, 'definition')}
            value={definition}
            disabled={isAnyProcessOngoing}
          />
        </div>
      </div>
      <div className='grid place-self-end gap-2 w-1/2'>
        <button
          className='p-2 bg-pink-400 text-lg disabled:opacity-25'
          onClick={handleCancel}
          disabled={isAnyProcessOngoing}
        >
          Cancel
        </button>
        <button
          className='p-2 bg-green-400 text-lg disabled:opacity-25'
          onClick={handleSubmit}
          disabled={utils.multiConditionChecker(conditionsForDisableButton)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
