import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, Outlet } from 'react-router-dom'
import { Footer, Navbar, ScrollToTop, QrScanBar } from './components'
import { Toaster } from 'react-hot-toast'
import { CreditCard, Headphones, Home, QrCode } from 'lucide-react'
import { DoctorContext } from './context/DoctorContext'



const App = () => {
  const { currentDoc } = useContext(DoctorContext)


  return <div className='bg-indigo-100/15'>
    <Navbar />
    <Toaster />
    <div className='min-h-screen pt-4'>
      <ScrollToTop />
      <Outlet />
    </div>
    { currentDoc && <QrScanBar />}
    <Footer />
  </div>
}

export default App