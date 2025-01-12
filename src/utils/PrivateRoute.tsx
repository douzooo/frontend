import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

const PrivateRoute: React.FC = () => {
  const { token } = useAuth(); // Destructure token from the context
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
