import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, loggedIn, ...props }) {
  return loggedIn ? children : <Navigate to="/signin" />;
}
