import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { useState, useEffect } from 'react';



const ProtectedDocRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { checkAuthStatus } = useContext(DoctorContext);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuthStatus();
      setIsAuthenticated(isAuth);
      setLoading(false);
    };
    
    verifyAuth();
  }, []);

  if (loading) {
    return <div className='text-center my-20 text-2xl font-semibold'>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login"/>;
};


export default ProtectedDocRoute;