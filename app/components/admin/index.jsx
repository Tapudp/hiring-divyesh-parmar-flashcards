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
    return <Loader />;
  }

  return (
    <div className='grid gap-2 grid-cols-12 p-2'>
      <div />
      <div className='grid col-span-5'>
        <div className='grid grid-cols-2 mb-2 py-1'>
          <WordCount />
          {mode !== constants.MODES.create ? <CreateButton /> : <div className='grid' />}
        </div>
        <WordList />
      </div>
      <div className='grid col-span-5 border border-1 rounded'>
        {mode === constants.MODES.create ? <Creator /> : <Actor />}
      </div>
      <div />
    </div>
  );
}
