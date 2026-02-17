import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../auth/authInit';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = userInfo => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const userEmailVerify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const userPassRest = email => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logOut = () => {
    return signOut(auth);
  };

  const createUserAuthInfo = {
    isLoading,
    user,
    setUser,
    userRegister,
    loginUser,
    logOut,
    updateUserProfile,
    userEmailVerify,
    userPassRest,
  };

  return (
    <AuthContext value={createUserAuthInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
