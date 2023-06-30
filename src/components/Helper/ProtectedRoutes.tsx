import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useData from '../../hooks/useData';

type Role = 'admin' | 'teacher'| 'student';

type RoutesProps = {
  children?: React.ReactNode,
  allowedAccess: Role[],
} 

const ProtectedRoutes = ({ children, allowedAccess }: RoutesProps) => {
  const { getUser } = useData();
  
  if (allowedAccess.some((access) => access === getUser()?.access)) {
    return children ? children : <Outlet />
  } else {
    return <Navigate to='/' />
  }
}

export default ProtectedRoutes;