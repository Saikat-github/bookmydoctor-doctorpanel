import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import { ChevronDown } from "lucide-react";
import LogoutComponent from './LogoutComponent';
import { DoctorContext } from '../context/DoctorContext';




const Navbar = () => {
    const navigate = useNavigate()
    const { profileData } = useContext(DoctorContext);


    return (
        <div className={`flex items-center justify-between px-2 sm:px-10 sm:py-3 py-2 border-b border-b-indigo-700 sticky top-0 bg-white z-50`}>
            <div onClick={() => navigate("/")} className=''>
                <div className='flex items-center justify-center gap-1 cursor-pointer'>
                    <p className='sm:text-2xl sm:block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                        bookmydoctor.
                    </p>
                </div>
            </div>
            <Sidebar />
            <div className='group cursor-pointer px-2'>
                <ChevronDown />
                <LogoutComponent />
            </div>
        </div>

    )
}

export default Navbar