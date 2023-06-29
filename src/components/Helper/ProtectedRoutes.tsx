import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  return !localStorage.getItem('logged') === false ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes;