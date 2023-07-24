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
        className='grid cursor-default text-6xl text-purple-800 text-opacity-70 hover:text-red-400 cursor-pointer'
        onClick={navigateToEntry}
      >
        Flashcards
      </p>
      {userType !== '' ? (
        <p
          className='grid self-center justify-self-end py-2 px-3 text-lg cursor-pointer font-serif font-bold tracking-wide text-rose-700 underline decoration-wavy underline-offset-4 capitalize hover:uppercase'
          onClick={navigateToEntry}
        >
          {userType}
        </p>
      ) : null}
    </div>
  );
}
