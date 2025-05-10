import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Gem, CreditCard, LogOut } from 'lucide-react';



const LogoutComponent = ({setIsMobileMenuOpen}) => {
  const { backendUrl, currentDoc, setCurrentDoc } = useContext(DoctorContext);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(backendUrl + "/api/doctor/logout", { withCredentials: true })
      if (data.success) {
        setCurrentDoc(false);
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  }
  return (
    <div className={`absolute top-10 right-2  bg-white shadow-md shadow-slate-500 text-white rounded py-4 px-6 z-10 transition-opacity duration-200 ease-in-out`}>
      {currentDoc
        ?
        <div className="space-y-4 text-slate-800">
          <Link
            to={"/doctor-profile"}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex text-xs md:text-sm items-center gap-2 cursor-pointer transition-all duration-200 opacity-90 hover:opacity-100"
          >
            <User className="w-5 h-5 text-indigo-600" />
            <p>Profile</p>
          </Link>

          <Link
            to={"/subscription-details"}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex text-xs md:text-sm items-center gap-2 cursor-pointer transition-all duration-200 opacity-90 hover:opacity-100"
          >
            <Gem className="w-5 h-5 text-indigo-600" />
            <p>Subscription</p>
          </Link>

          <Link
            to={"/payments"}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex text-xs md:text-sm items-center gap-2 cursor-pointer transition-all duration-200 opacity-90 hover:opacity-100"
          >
            <CreditCard className="w-5 h-5 text-indigo-600" />
            <p>Payments</p>
          </Link>

          <button
            disabled={loader}
            className="flex text-xs md:text-sm items-center gap-2 cursor-pointer transition-all duration-200 opacity-90 hover:opacity-100 text-red-600"
            onClick={logout}
          >
            {loader ? (
              <div className="w-4 h-4 rounded-full border-dashed mx-4 border-2 border-red-600 animate-spin"></div>
            ) : (
              <>
                <LogOut className="w-5 h-5 text-red-500" />
                Logout
              </>
            )}
          </button>
        </div>

        :
        <Link
          to={"/login"}
          onClick={() => setIsMobileMenuOpen(false)}
          className='flex text-sm md:text-sm items-center gap-2 cursor-pointer transition-all duration-200 opacity-90 hover:opacity-100 text-indigo-700'>
          <LogOut className="w-5 h-5" />
          Login
        </Link>}
    </div>
  )
}

export default LogoutComponent