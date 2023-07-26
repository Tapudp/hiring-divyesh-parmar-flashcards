'use client';
import { useAdminContext } from '@/app/context/admin';
import React from 'react';

export default function WordCount() {
  const {
    adminState: { listOfWords },
    isAdminContentLoading,
  } = useAdminContext();

  return (
    <div className='grid text-sm text-black-300 bg-blue-100 cursor-default p-2 mr-2 items-center'>
      Total words count : {isAdminContentLoading ? '. . . ' : listOfWords.length}
    </div>
  );
}
