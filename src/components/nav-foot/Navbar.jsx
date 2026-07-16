import React, { useContext, useState } from 'react'
import Sidebar from './Sidebar';
import { Menu, X } from "lucide-react";
import LogoutComponent from '../auth/LogoutComponent';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    return (
        <div className={`flex items-start justify-between p-4 px-6 border-b border-b-indigo-700 sticky top-0 bg-white z-50`}>
            <div onClick={() => navigate("/")} className=''>
                <div className='cursor-pointer text-xl sm:text-2xl sm:block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                    <p>
                        bookmeadr.
                    </p>
                    <p className="text-xs">Doctor Panel</p>
                </div>
            </div>

            <Sidebar />

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-indigo-600 focus:outline-none hover:cursor-pointer"
            >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {isMobileMenuOpen && <LogoutComponent setIsMobileMenuOpen={setIsMobileMenuOpen} />}
        </div>

    )
}

export default Navbar