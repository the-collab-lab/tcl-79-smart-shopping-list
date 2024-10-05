import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth';

const ProtectedRoutes = ({}) => {
	const { user } = useAuth();
	const isAuthenticated = user || localStorage.getItem('user');
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};
export default ProtectedRoutes;
