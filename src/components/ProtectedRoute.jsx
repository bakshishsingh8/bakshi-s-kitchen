// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If no token → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // If token exists → allow access
};

export default ProtectedRoute;