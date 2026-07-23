import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { Home, QrCode, Headphones, ArrowLeft } from "lucide-react"


const QrScanBar = () => {
    const location = useLocation()

    if (location.pathname === "/doc-qrscanner") {
        return (
            <div className='fixed bottom-0 pb-2 w-full bg-white flex justify-center px-6 items-center text-gray-900'>
            <Link to={"/"} className='p-4 bg-indigo-600 text-white rounded-full hover:scale-105 transition-all duration-200'>
                <ArrowLeft className='w-6 h-6' />
            </Link>
        </div>
        );
    }


    return (
        <div className='fixed bottom-0 pb-2 w-full bg-white flex justify-center px-6 items-center text-gray-900'>
            <Link to={"/doc-qrscanner"} className='p-4 bg-indigo-600 text-white rounded-full hover:scale-105 transition-all duration-200'>
                <QrCode className='w-6 h-6' />
            </Link>
        </div>
    )
}

export default QrScanBar