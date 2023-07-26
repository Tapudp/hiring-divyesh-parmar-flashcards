'use client';
import React from 'react';
import { useAdminContext } from '../../context/admin';

export default function WordList() {
  const {
    adminState: { selectedWord, listOfWords },
    pickWord,
  } = useAdminContext();

  const wordItemStyles =
    'border rounded border-2 border-red-100 hover:border-indigo-200 bg-purple-100 shadow-2xl m-2 p-2 cursor-pointer';

  const selectedWordStyles = (id) => {
    return selectedWord && selectedWord.id === id
      ? 'bg-blue-300'
      : 'bg-purple-100 hover:bg-pink-100';
  };

  if (!listOfWords || listOfWords.length < 1) {
    return <div> There are no words available yet!</div>;
  }

  return (
    <ul className='h-96 overflow-auto shadow-inner'>
      {listOfWords.map(({ id, word, definition }, wIdx) => (
        <li
          key={`${id}-${wIdx + 1}`}
          className={`${wordItemStyles} ${selectedWordStyles(id)}`}
          onClick={() => pickWord({ id, word, definition })}
        >
          <p className='text-lg'>{word}</p>
          <p className='text-sm'>{definition}</p>
        </li>
      ))}
    </ul>
  );
}
