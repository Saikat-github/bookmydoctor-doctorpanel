import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DoctorContextProvider from './context/DoctorContext.jsx'
import { DoctorAppointments, DoctorDashboard, DoctorProfile, LoginPage, ForgetPassword, DoctorQR, Subscription, Payments, NotFound, Plans, QRScanner } from './pages/index.js'
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
        path: "/doctor-dashboard",
        element: <ProtectedDocRoute>
          <DoctorDashboard />
        </ProtectedDocRoute>
      },
      {
        path: "/doctor-appointments",
        element: <ProtectedDocRoute>
          <DoctorAppointments />
        </ProtectedDocRoute>
      },

      {
        path: "/doctor-profile",
        element: <ProtectedDocRoute>
          <DoctorProfile />
        </ProtectedDocRoute>
      },
      {
        path: "/qrscanner",
        element: <ProtectedDocRoute>
          <QRScanner />
        </ProtectedDocRoute>
      },
      {
        path: "/qr-download",
        element: <ProtectedDocRoute>
          <DoctorQR />
        </ProtectedDocRoute>
      },
      {
        path: "/subscription-details",
        element: <ProtectedDocRoute>
          <Subscription />
        </ProtectedDocRoute>
      },
      {
        path: "/payments",
        element: <ProtectedDocRoute>
          <Payments />
        </ProtectedDocRoute>
      },
      {
        path: "/checkout",
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
