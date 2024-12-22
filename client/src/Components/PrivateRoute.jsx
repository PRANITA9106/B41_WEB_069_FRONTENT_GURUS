
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute = ({ element, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
