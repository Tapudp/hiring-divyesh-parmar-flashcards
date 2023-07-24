'use client';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  value: {
    userType: '',
  },
});

// Provider
const CommonProvider = ({ children }) => {
  const [state, setState] = useState({
    userType: '',
  });

  return <UserContext.Provider value={{ state, setState }}>{children}</UserContext.Provider>;
};

// Consumer
const useUserContext = () => {
  const { state, setState } = useContext(UserContext);
  return { state, setState };
};

export { CommonProvider, useUserContext };
