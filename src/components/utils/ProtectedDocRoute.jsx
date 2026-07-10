import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';


const ProtectedDocRoute = ({ children }) => {
  const { isAuthenticated, loader } = useContext(DoctorContext);


  if (loader) {
    return <div className='flex flex-col justify-center items-center gap-4 text-black/85 h-[80vh]'>
      <Loader2 className='h-6 w-6 animate-spin' />
      <p>Checking authentication...</p>
    </div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};


export default ProtectedDocRoute;