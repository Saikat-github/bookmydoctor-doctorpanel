import { useContext} from 'react'
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import {Home, QrCode} from 'lucide-react';

const Sidebar = () => {
  const { currentDoc } = useContext(DoctorContext);


  return (
    <div>
      {
        currentDoc
        &&
        <ul className={`text-gray-700  flex gap-8 md:gap-20`}>

          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `flex flex-col md:flex-row text-xs md:text-sm items-center gap-1 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
              }`
            }
          >
            <Home className="w-5 h-5 text-indigo-600" />
            <p className="max-sm:text-xs">Home</p>
          </NavLink>

          <NavLink
            to={'/qrscanner'}
            className={({ isActive }) =>
              `flex flex-col md:flex-row text-xs md:text-sm items-center gap-1 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
              }`
            }
          >
            <QrCode className="w-5 h-5 text-indigo-600" />
            <p className="max-sm:text-xs">Scan QR</p>
          </NavLink>

        </ul>
      }

    </div>
  )
}

export default Sidebar

