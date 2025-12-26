import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/userContext";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
