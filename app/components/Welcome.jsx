'use client';
import React from 'react';
import UserDropdown from './UserDropdown';
import Logo from '@/public/next.svg';
import Image from 'next/image';

export default function Welcome() {
  return (
    <div className='grid gap-2 grid-rows-6 border border-fuchsia-700 items-center rounded w-96 p-10 shadow-2xl border-opacity-20 place-self-center'>
      <p className='text-2xl border row-span-2 border-2 rounded bg-pink-100 border-fuschia-300 grid place-items-center h-full'>
        Welcome to Flashcards
      </p>
      <div />
      <UserDropdown />
    </div>
  );
}
