import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Element}) => {
  const isAuthenticated = localStorage.getItem('token') 
  return isAuthenticated ? <Outlet />: <Navigate to="/" />;
}

export default ProtectedRoute