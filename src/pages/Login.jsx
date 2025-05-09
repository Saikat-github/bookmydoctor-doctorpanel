import React, { useContext, useEffect, useState } from 'react'
import { Signup, Login as LoginComponent } from '../components'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const [state, setState] = useState('Login');
    const { currentDoc, backendUrl } = useContext(DoctorContext);
    const navigate = useNavigate()
    const location = useLocation();


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const message = params.get('message');
        if (message) {
            toast.error(message)
        }
    }, [location]);


    return (
        <div className="pt-16 flex justify-center">
            <div className='max-w-80 shadow-lg shadow-slate-400 rounded-lg text-xs sm:text-sm py-4 px-6 sm:px-10 space-y-2 bg-white mb-20 max-sm:mb-32'>
                {
                    state === "Login"
                        ?
                        <LoginComponent state={state} setState={setState} />
                        :
                        <Signup state={state} setState={setState} />
                }
            </div>
        </div>

    )
}

export default Login