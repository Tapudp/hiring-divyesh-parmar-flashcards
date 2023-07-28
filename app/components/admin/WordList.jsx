'use client';
import React, { useEffect } from 'react';
import { useAdminContext } from '../../context/admin';

export default function WordList() {
  const {
    adminState: { selectedWord, listOfWords },
    pickWord,
    isAnyProcessOngoing,
  } = useAdminContext();

  const wordItemStyles =
    'w-full grid place-items-start border rounded border-11 border-red-100 hover:border-indigo-200 bg-purple-100 shadow-3xl my-2 p-2 cursor-pointer';

  const selectedWordStyles = (id) => {
    return selectedWord && selectedWord.id === id
      ? 'bg-blue-300'
      : 'bg-purple-100 hover:bg-pink-100';
  };

  useEffect(() => {
    const wordListContainer = document.getElementById('word-list-container');
    if (wordListContainer) {
      wordListContainer.scrollTo(0, 0);
    }
  }, [listOfWords.length]);

  if (!listOfWords || listOfWords.length < 1) {
    return <div> There are no words available yet!</div>;
  }

  return (
    <ul id='word-list-container' className='h-96 overflow-auto shadow-inner'>
      {listOfWords.map(({ id, word, definition }, wIdx) => (
        <button
          key={`${id}-${wIdx + 1}`}
          className={`${wordItemStyles} ${selectedWordStyles(id)}`}
          onClick={() => pickWord({ id, word, definition })}
          disabled={isAnyProcessOngoing}
        >
          <p className='text-lg'>{word}</p>
          <p className='text-sm text-left'>{definition}</p>
        </button>
      ))}
    </ul>
  );
}
