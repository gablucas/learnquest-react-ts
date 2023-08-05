import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../../types/Commom';
import { getLoggedUser } from '../../helpers/user/getLoggedUser';

type RoutesProps = {
  children?: React.ReactNode,
  allowedAccess: Role[],
} 

const ProtectedRoutes = ({ children, allowedAccess }: RoutesProps) => {
  const user = getLoggedUser();
  
  if (user) {
    if (allowedAccess.some((access) => access === user.access)) {
      return children ? children : <Outlet />
    } else if (user.access === 'student') {
      return <Navigate to='/estudante' />
    } else if (user.access === 'teacher' || user.access === 'admin') {
      return <Navigate to='/painel' />
    }
  } else {
    return <Navigate to='/' />
  }
}

export default ProtectedRoutes;