'use client';
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';

export default function Page() {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const {
    state: { userType },
  } = useUserContext();

  useEffect(() => {
    if (!userType) {
      router.push('/');
      return;
    }
    setLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <div>student study layout</div>;
}
