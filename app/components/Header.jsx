'use client';
import React from 'react';
import { useUserContext } from '../context';
import { useRouter } from 'next/navigation';

export default function Header() {
  const {
    state: { userType },
    setState,
  } = useUserContext();
  const router = useRouter();

  const navigateToEntry = () => {
    setState((prev) => (prev.userType !== '' ? { userType: '' } : prev));
    router.replace('/');
  };

  return (
    <div className='border border-solid rounded bg-green-100 grid grid-cols-2'>
      <p
        className='grid cursor-default text-5xl text-purple-800 text-opacity-70 hover:text-red-400 cursor-pointer w-fit'
        onClick={navigateToEntry}
      >
        Flashcards
      </p>
      {userType !== '' ? (
        <p
          className='grid self-center justify-self-end py-2 px-3 text-lg cursor-pointer font-serif font-bold text-purple-600 hover:text-opacity-25 capitalize hover:underline border-2 border-indigo-100 hover:bg-indigo-200 hover:shadow-inner'
          onClick={navigateToEntry}
        >
          {userType}
        </p>
      ) : null}
    </div>
  );
}
