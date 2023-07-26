'use client';
import React from 'react';
import UserDropdown from './UserDropdown';

export default function Welcome() {
  return (
    <div className='grid border border-fuchsia-700 rounded w-96 p-10 shadow-2xl border-opacity-20 place-self-center'>
      <p>Welcome to Flash cards</p>
      <p>Select the user type to move forward</p>
      <UserDropdown />
    </div>
  );
}
