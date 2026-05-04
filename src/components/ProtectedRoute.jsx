import { Navigate } from 'react-router';
import { isTokenValid } from '../utils/auth';

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute