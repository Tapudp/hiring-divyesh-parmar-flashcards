'use client';
import { useStudentContext } from '@/app/context/student';
import React from 'react';

export default function ActionTray({ individualWordToReview }) {
  const {
    studentState: { showDefinition },
    isProcessOngoing,
    updateReview,
  } = useStudentContext();

  if (!showDefinition) return null;

  const handleReview = async (answer) => {
    const confirmed = confirm(`Are you sure to submit the answer`);

    if (!confirmed) return;

    updateReview(individualWordToReview, answer).then((result) => alert(result));
  };

  return (
    <div className='grid grid-cols-2'>
      <button
        className='grid border bg-green-200 place-self-start items-center w-fit p-2'
        onClick={async () => await handleReview(true)}
        disabled={isProcessOngoing}
      >
        I get it!
      </button>
      <button
        className='grid border bg-red-200 items-center place-self-end w-fit p-2'
        onClick={async () => await handleReview(false)}
        disabled={isProcessOngoing}
      >
        I did not get it!
      </button>
    </div>
  );
}
