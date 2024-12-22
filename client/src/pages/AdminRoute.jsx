import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = JSON.parse(atob(token.split('.')[1]));
  if (decoded.role !== 'admin') {
    return <Navigate to="/404" />;
  }

  return children;
};

export default AdminRoute;
