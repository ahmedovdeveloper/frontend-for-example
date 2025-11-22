// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const FREE_REQUESTS_LIMIT = 3;

const getFreeRequestsUsed = () => {
  const saved = localStorage.getItem("aha_ai_free_requests");
  return saved ? parseInt(saved, 10) : 0;
};

export default function PrivateRoute({ children }) {
  const requestsUsed = getFreeRequestsUsed();
  const hasAccess = requestsUsed < FREE_REQUESTS_LIMIT;

  return hasAccess ? children : <Navigate to="/login" replace />;
}