'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import logger from '../helpers/logger';

const UserContext = createContext({
  value: {
    userType: '',
  },
});

// Provider
const CommonProvider = ({ children }) => {
  const router = useRouter();
  const [state, setState] = useState({
    userType: '',
  });

  useEffect(() => {
    if (state.userType === '') {
      logger.debug('from the common provider :: ', state);
      router.replace('/');
    }
  }, []);

  return <UserContext.Provider value={{ state, setState }}>{children}</UserContext.Provider>;
};

// Consumer
const useUserContext = () => {
  const { state, setState } = useContext(UserContext);
  return { state, setState };
};

export { CommonProvider, useUserContext };
