import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, QrCode, CalendarCheck, BarChart3, Menu, X, User, Gem, CreditCard, LogOut } from 'lucide-react'
import LogoutComponent from '../auth/LogoutComponent';
import { DoctorContext } from '../../context/DoctorContext';




const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentDoc } = useContext(DoctorContext);


    const links = [
        { to: '/', label: 'Home', icon: Home, show: currentDoc },
        { to: '/doc-appointments', label: 'Appointments', icon: CalendarCheck, show: currentDoc },
        { to: '/doc-stats', label: 'Patient Stats', icon: BarChart3, show: currentDoc },
        // { to: '/doc-qrscanner', label: 'Scan QR', icon: QrCode },
        { to: '/doc-profile', label: 'Profile', icon: User, show: currentDoc },
        { to: '/doc-subscription', label: 'Subscription', icon: Gem, show: currentDoc },
        { to: '/doc-payments', label: 'Payments', icon: CreditCard, show: currentDoc },
    ]


    return (
        <div className={`flex flex-col lg:flex-row lg:justify-between p-2 lg:p-4 sticky top-0 bg-white z-50`}>
            <div className='flex  justify-between'>
                <NavLink to="/" className="flex flex-col leading-tight shrink-0">
                    <span className="text-xl font-extrabold tracking-tight text-indigo-600">bookmeadr.</span>
                    <span className="text-xs font-medium text-gray-400 -mt-0.5">Doctor Panel</span>
                </NavLink>
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="focus:outline-none hover:cursor-pointer lg:hidden text-gray-500 p-1 hover:bg-indigo-50 rounded"
                >
                    {isMobileMenuOpen ? <X className="w-6" /> : <Menu className="w-6" />}
                </button>
            </div>


            {/* Desktop View */}
            <nav
                className={`hidden lg:flex gap-2 text-sm font-medium`}
            >
                {links.map((l) => (
                    l.show && <NavItem key={l.to} {...l} />
                ))}
                <LogoutComponent setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </nav>


            {/* Mobile View */}
            {isMobileMenuOpen &&
                <nav
                    className={`flex flex-col lg:hidden h-screen my-6 items-start gap-4 text-sm font-medium`}
                >
                    {links.map((l) => (
                        l.show && <NavItem key={l.to} {...l} onClick={() => setIsMobileMenuOpen(false)} />
                    ))}
                    <LogoutComponent setIsMobileMenuOpen={setIsMobileMenuOpen} />
                </nav>
            }
        </div>

    )
}

export default Navbar














function NavItem({ to, label, icon: Icon, show, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `max-lg:w-full flex items-center gap-1 px-3 py-2 rounded-lg transition-colors text-xs ${isActive ? 'text-indigo-700 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-slate-100'}`}
        >
            <Icon size={18} strokeWidth={2} />
            {label}
        </NavLink>
    )
}