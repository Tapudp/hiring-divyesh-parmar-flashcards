'use client';
import React, { useEffect, useState } from 'react';
import logger from '../helpers/logger';
import { useUserContext } from '../context';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';

const fetchAllWords = async () => {
  try {
    const response = await fetch('/api/v1/words');
    return await response.json();
  } catch (error) {
    logger.error('Admin layout failed to fetch words :: ', error);
  }
};

// eslint-disable-next-line
export default function Page() {
  const [words, setWords] = useState([]);
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

    fetchAllWords()
      .then(({ success, message, data }) => {
        setWords(data);
      })
      .catch((error) => {
        logger.error('Failed to fetch all words on admin panel :: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <button>Add a new word</button>
      <div>{words.length}</div>
    </div>
  );
}
