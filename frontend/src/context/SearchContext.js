import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const SearchContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useSearch = () => {
  return useContext(SearchContext);
};

// 3. Create the Provider component that will wrap your app
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};