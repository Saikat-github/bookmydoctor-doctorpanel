import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar, ScrollToTop } from './components'




const App = () => {


  return <div>
    <Navbar />
    <ToastContainer />
    <div className='min-h-screen pt-4'>
      <ScrollToTop />
      <Outlet />
    </div>
    <Footer />
  </div>
}

export default App