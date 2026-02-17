import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

  const createUserAuthInfo = {
    
  }

  return (
    <AuthContext value={createUserAuthInfo}>{ children}</AuthContext>
  );
};

export default AuthProvider;