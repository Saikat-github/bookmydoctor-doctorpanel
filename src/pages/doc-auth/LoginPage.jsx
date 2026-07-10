import { useContext, useEffect, useState } from 'react'
import { Signup, Login } from '../../components'
import { useLocation, Navigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { DoctorContext } from '../../context/DoctorContext';

const LoginPage = () => {
    const [state, setState] = useState('login');
    const location = useLocation();
    const { currentDoc } = useContext(DoctorContext)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const message = params.get('message');
        if (message) {
            toast.error(message)
        }
    }, [location]);

    if (currentDoc) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="pt-16 flex justify-center">
            <div className='max-w-80 shadow-lg shadow-slate-400 rounded-lg text-xs sm:text-sm py-4 px-6 sm:px-10 space-y-2 bg-white mb-20 max-sm:mb-32'>
                {
                    state === "login"
                        ?
                        <Login state={state} setState={setState} />
                        :
                        <Signup state={state} setState={setState} />
                }
            </div>
        </div>
    )
}

export default LoginPage