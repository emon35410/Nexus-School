import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/authInit';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading]=useState(true)

  const register = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const loginUser = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    })
    return () => unsubscribe();
  }, []);

  

  const createUserAuthInfo = {
    
  }

  return (
    <AuthContext value={createUserAuthInfo}>{ children}</AuthContext>
  );
};

export default AuthProvider;