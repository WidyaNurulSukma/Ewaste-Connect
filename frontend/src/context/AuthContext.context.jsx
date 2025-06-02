import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    window.localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const getUser = () => {
    return window.localStorage.getItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
