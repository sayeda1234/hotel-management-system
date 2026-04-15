import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = true; // 🔒 Replace with real auth check
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
