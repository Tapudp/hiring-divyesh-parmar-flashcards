'use client';
import React from 'react';

export default function Creator() {
  return (
    <div>
      <div>Create a new word</div>
      <div>
        <input className='border border-2 rounded' placeholder='word' />
      </div>
      <div>
        <textarea
          className='border border-2 rounded'
          placeholder='add the definition of the word'
        />
      </div>
      <button
        className='p-2 bg-green-400 place-self-start w-1/2'
        onClick={() => console.log('new word created')}
      >
        Save changes
      </button>
    </div>
  );
}
