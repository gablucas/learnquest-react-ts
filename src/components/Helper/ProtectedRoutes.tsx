import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../../types/Commom';
import { GlobalContext } from '../../GlobalContext';
import { getLoggedUser } from '../../helpers/user/getLoggedUser';

type RoutesProps = {
  children?: React.ReactNode,
  allowedAccess: Role[],
} 

const ProtectedRoutes = ({ children, allowedAccess }: RoutesProps) => {
  const { user } = React.useContext(GlobalContext);  
  const loggedUser = user ? getLoggedUser() : undefined; 

  if (loggedUser) {
    if (allowedAccess.some((access) => access === loggedUser.access)) {
      return children ? children : <Outlet />
    } else if (loggedUser.access === 'student') {
      return <Navigate to='/estudante' />
    } else if (loggedUser.access === 'teacher' || loggedUser.access === 'admin') {
      return <Navigate to='/painel' />
    }
  } else {
    return <Navigate to='/' />
  }
}

export default ProtectedRoutes;