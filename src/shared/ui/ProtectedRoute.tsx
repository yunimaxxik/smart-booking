import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
