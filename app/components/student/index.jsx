'use client';

import React, { useState } from 'react';
import Loader from '../Loader';
import { useStudentContext } from '@/app/context/student';
import constants from '@/app/constants';
import ReviewCard from './ReviewCard';
import ActionTray from './ActionTray';

export default function StudentComponent() {
  const {
    isStudentContentLoading,
    studentState: { reviewWords },
  } = useStudentContext();

  if (isStudentContentLoading) {
    return (
      <div className='grid col-span-10'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className='grid col-span-2' />
      <div className='grid col-span-6 gap-2'>
        <p className='bg-green-200 w-fit flex gap-2 items-end p-2 h-12'>
          Words to review <p className='text-2xl items-end'>{reviewWords?.length || 0}</p>
        </p>
        <div className='grid shadow-inner shadow-2xl bg-blue-200 gap-3 p-2 rounded'>
          <ReviewCard />
        </div>
      </div>
      <div className='grid col-span-2' />
    </>
  );
}
