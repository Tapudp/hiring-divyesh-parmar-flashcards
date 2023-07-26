'use client';
import { useAdminContext } from '@/app/context/admin';
import React from 'react';

export default function WordCount() {
  const {
    adminState: { listOfWords },
  } = useAdminContext();

  return (
    <div className='grid text-sm text-black-300 bg-blue-100 cursor-default px-2 mr-2 items-center'>
      Total words count : {listOfWords.length}
    </div>
  );
}
