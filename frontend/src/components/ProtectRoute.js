import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ Role mismatch
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;