import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext); // Assuming `auth` contains login status
  return auth ? <Outlet /> : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
