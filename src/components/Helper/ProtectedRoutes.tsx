import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { auth } = React.useContext(GlobalContext)
  return !auth === false ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes;