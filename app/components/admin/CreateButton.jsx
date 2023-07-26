'use client';
import { useAdminContext } from '@/app/context/admin';
import React from 'react';

export default function CreateButton() {
  const { switchToCreateMode } = useAdminContext();

  return (
    <button
      className='grid items-center border rounded cursor-pointer w-3/4 bg-blue-400 hover:bg-blue-100 p-1'
      onClick={switchToCreateMode}
    >
      Add a new word
    </button>
  );
}
