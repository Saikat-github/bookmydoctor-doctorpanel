import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar, ScrollToTop } from './components'
import { Toaster } from 'react-hot-toast'



const App = () => {


  return <div>
    <Navbar />
    <Toaster />
    <div className='min-h-screen pt-4'>
      <ScrollToTop />
      <Outlet />
    </div>
    <Footer />
  </div>
}

export default App