'use client';
import { useAdminContext } from '@/app/context/admin';
import React, { useState } from 'react';

export default function Creator() {
  const [word, setWord] = useState('');
  const [definition, setDefitnition] = useState('');

  const { createWord } = useAdminContext();

  const handleWord = (event) => {
    if (!event) {
      return;
    }
    if (event.target.value.length > 255) {
      return;
    }
    setWord(event.target.value);
  };

  const handleDefinition = (event) => {
    if (!event) {
      return;
    }
    if (event.target.value.length > 255) {
      return;
    }
    setDefitnition(event.target.value);
  };

  const handleSubmit = async () => {
    const confirmed = confirm(`You are about to create this word : ${word}`);

    if (!confirmed) return;

    const creationResult = await createWord({ word, definition });
    console.log(':: afterr creation :: ', creationResult);
    setWord('');
    setDefitnition('');
    alert(`${creationResult}`);
  };

  return (
    <div className='grid grid-rows-2 gap-2 p-4'>
      <div className='grid grid-rows-3'>
        <div className='grid place-content-start text-2xl row-span-1'>Create a new word</div>
        <div className='grid grid-cols-4 place-content-center row-span-1'>
          <label htmlFor='word-name' className='grid col-span-1'>
            Word
          </label>
          <input
            id='word-name'
            className='border border-2 rounded col-span-3 p-2 w-1/2'
            placeholder='word'
            onChange={handleWord}
            value={word}
          />
        </div>
        <div className='grid grid-cols-4 row-span-1'>
          <label htmlFor='word-definition' className='grid col-span-1'>
            Definition
          </label>
          <textarea
            id='word-definition'
            className='border border-2 rounded col-span-3 p-2 resize-none'
            placeholder='provide the definition of the word'
            onChange={handleDefinition}
            value={definition}
          />
        </div>
      </div>
      <div className='grid place-self-end'>
        <button
          className='p-2 bg-green-400 text-lg disabled:opacity-25'
          onClick={handleSubmit}
          disabled={
            (word.length === 0 && word.length < 256) ||
            (definition.length === 0 && definition.length < 256)
          }
        >
          Submit word
        </button>
      </div>
    </div>
  );
}
