import { AuthContext } from '../contexts/AuthProvider';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedPage = () => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedPage;
