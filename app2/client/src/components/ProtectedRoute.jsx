import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Element}) => {
  const isAuthenticated = localStorage.getItem('token'); // You can use any method to check the authentication
  return isAuthenticated ? <Outlet />: <Navigate to="/" />;
}

export default ProtectedRoute