'use client';

import React from 'react';
import ActionTray from './ActionTray';
import { useStudentContext } from '@/app/context/student';

export default function ReviewCard() {
  const {
    studentState: { reviewWords, currentReviewStatus, showDefinition },
    isProcessOngoing,
    toggleDefinition,
  } = useStudentContext();

  if (currentReviewStatus !== '' || reviewWords.length === 0) {
    return (
      <div className='grid col-span-6 bg-green-200 p-2 text-xl'>
        <div>{currentReviewStatus}</div>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-1 items-center'>
        <p className='text-2xl capitalize'>{reviewWords[0].word}</p>
        <button
          className={`grid border items-start w-1/2 p-2 rounded place-self-end place-items-center ${
            showDefinition ? 'bg-gray-100' : 'bg-blue-300'
          }`}
          onClick={() => toggleDefinition(!showDefinition)}
          disabled={isProcessOngoing}
        >
          {showDefinition ? 'Hide definition' : 'Show definition'}
        </button>
      </div>
      <p>{showDefinition && reviewWords[0].definition}</p>
      <ActionTray individualWordToReview={reviewWords[0]} />
    </>
  );
}
