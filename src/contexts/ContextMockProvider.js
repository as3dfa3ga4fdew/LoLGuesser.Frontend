import React, { createContext, useContext } from 'react';

//Mock context for UserContext
export const UserContext = createContext();

export const UserContextMockProvider = ({ children, value }) => {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

//Mock context for ChampionNamesContext
export const ChampionNamesContext = createContext();

export const ChampionNamesContextMockProvider = ({ children, value }) => {
  return (
    <ChampionNamesContext.Provider value={value}>
      {children}
    </ChampionNamesContext.Provider>
  );
};
