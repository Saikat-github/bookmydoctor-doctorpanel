import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DoctorContextProvider from './context/DoctorContext.jsx'
import { DoctorAppointments, DoctorDashboard, DoctorProfile, LoginPage, ForgetPassword, DoctorQR, Subscription, Payments, NotFound, Plans, QRScanner, DoctorStats, Contact } from './pages/index.js'
import Home from './pages/Home.jsx'
import ProtectedDocRoute from './components/utils/ProtectedDocRoute.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Doctor Protected Routes
      {
        path: '/',
        element: <ProtectedDocRoute>
          <Home />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-stats",
        element: <ProtectedDocRoute>
          <DoctorStats />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-appointments",
        element: <ProtectedDocRoute>
          <DoctorAppointments />
        </ProtectedDocRoute>
      },

      {
        path: "/doc-profile",
        element: <ProtectedDocRoute>
          <DoctorProfile />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-qrscanner",
        element: <ProtectedDocRoute>
          <QRScanner />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-qrdownload",
        element: <ProtectedDocRoute>
          <DoctorQR />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-subscription",
        element: <ProtectedDocRoute>
          <Subscription />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-payments",
        element: <ProtectedDocRoute>
          <Payments />
        </ProtectedDocRoute>
      },
      {
        path: "/doc-checkout",
        element: <ProtectedDocRoute>
          <Plans />
        </ProtectedDocRoute>
      },

      // Auth
      {
        path: "/forget-password",
        element: <ForgetPassword />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/doc-support",
        element: <Contact />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DoctorContextProvider>
      <RouterProvider router={router} />
    </DoctorContextProvider>
  </StrictMode>,
)
