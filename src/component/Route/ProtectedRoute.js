import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }

    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }
    return children;
  }
};

export default ProtectedRoute;
