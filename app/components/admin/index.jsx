'use client';
import React from 'react';
import WordCount from './WordCount';
import WordList from './WordList';
import Actor from './Actor';
import CreateButton from './CreateButton';
import Loader from '../Loader';
import { useAdminContext } from '@/app/context/admin';
import Creator from './Creator';
import constants from '@/app/constants';

export default function AdminComponent() {
  const {
    isAdminContentLoading,
    adminState: { mode },
  } = useAdminContext();

  if (isAdminContentLoading) {
    return (
      <div className='grid col-span-10'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='grid col-span-10 grid-cols-2'>
      <div className='grid'>
        <div className='grid grid-cols-2 mb-2 py-1 h-12'>
          <WordCount />
          {mode !== constants.MODES.create ? <CreateButton /> : <div className='grid' />}
        </div>
        <WordList />
      </div>
      <div className='grid border border-1 rounded'>
        {mode === constants.MODES.create ? <Creator /> : <Actor />}
      </div>
    </div>
  );
}
