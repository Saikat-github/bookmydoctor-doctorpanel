import React from 'react'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate();


    return (
        <div className='mt-48 pt-10 pb-24 border-t-gray-300 border-t px-4 text-slate-800 space-y-16' id='footer'>
            <div className='flex justify-around flex-col sm:flex-row gap-4'>
                <p className='sm:text-2xl sm:block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                    bookmeadr.
                </p>
                <div className='text-xs flex flex-col gap-2'>
                    <p className='cursor-pointer hover:underline' onClick={() => navigate("/about")}>Terms & Privacy Policy</p>
                    <a
                        className='hover:underline'
                        href={import.meta.env.VITE_USERPANEL_URL} target='_blank'>User Panel</a>
                </div>
            </div>
            <p className='text-xs text-center'>Copyright {new Date().getFullYear()} &copy;bookmeadr. All Rights Reserved.</p>
        </div>
    )
}

export default Footer