import React from 'react'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate();



    return (
        <div className='mt-48 py-10 border-t-indigo-700 border-t px-4 text-slate-800' id='footer'>
            <div className='flex justify-around flex-col sm:flex-row gap-4'>
                <div className=''>
                    <h1 className='text-sm font-semibold mb-3'>Support</h1>
                    <div className='text-xs space-y-1 flex flex-col'>
                        <button onClick={() => window.location.href = "tel:+919635473546"} className='px-2 py-2 border border-indigo-400 hover:bg-indigo-700 transition-all duration-300 hover:text-white rounded-sm'>+91 9635473546</button>
                        <button onClick={() => window.location.href = "mailto:saikatservices@gmail.com?subject=Docator Panel Support"} className='px-2 py-2 border border-indigo-400 hover:bg-indigo-700 transition-all duration-300 hover:text-white rounded-sm'>saikatservices@gmail.com</button>
                    </div>
                </div>
                <div className='text-xs space-y-2'>
                    <h1 className='text-sm font-semibold mb-3'>Company</h1>
                    <p className='cursor-pointer hover:underline' onClick={() => navigate("/about")}>Terms & Condition</p>
                    <p className='cursor-pointer hover:underline' onClick={() => navigate("/about")}>Privacy Policy</p>
                </div>
            </div>
            <div className='mt-12 text-xs text-indigo-800 text-center flex flex-col justify-center gap-4'>
                <div className='flex items-center justify-center gap-2'>
                    <p className='sm:text-2xl sm:block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                        bookmydoctor.
                    </p>
                </div>
                <p className=''>Copyright 2025 &copy;bookmydoctor. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer