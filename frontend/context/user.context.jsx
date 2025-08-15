import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  const login = (userData) => {
    setUser(userData);
    // optionally store in localStorage or cookies
  };

  const logout = () => {
    setUser(null);
    // optionally remove from storage
  };

  return (
    <UserContext.Provider value={{setUser , user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

