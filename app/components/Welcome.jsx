'use client';
import React from 'react';
import UserDropdown from './UserDropdown';

export default function Welcome() {
  return (
    <div className='grid border-2 border-fuchsia-900 border-double rounded w-96 p-10'>
      <p>Welcome to Flash cards</p>
      <p>Select the user type to move forward</p>
      <UserDropdown />
    </div>
  );
}
