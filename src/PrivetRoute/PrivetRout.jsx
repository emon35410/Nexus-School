import React, { use } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivetRout = ({children}) => {
  const { user, isLoading } = use(AuthContext)
  if (isLoading) {
   return <p>Loading...</p>
  }
  if (user) {
    return children
  }

  return <Navigate to='/login'></Navigate>
};

export default PrivetRout;