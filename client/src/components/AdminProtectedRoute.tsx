import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, isAuthenticated } from '../utils/auth';
import { isAdminSessionValid, refreshAdminSession } from '../utils/adminAuth';

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const user = getUser();
    if (!user?.is_staff) {
      navigate('/home');
      return;
    }

    if (!isAdminSessionValid()) {
      navigate('/admin');
      return;
    }

    refreshAdminSession();
  }, [navigate]);

  return <>{children}</>;
}

export default AdminProtectedRoute;
