import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import toast from "react-hot-toast";
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Gem, CreditCard, LogOut, Loader2 } from 'lucide-react';



const LogoutComponent = ({ setIsMobileMenuOpen }) => {
  const { backendUrl, currentDoc, setCurrentDoc, setProfileData } = useContext(DoctorContext);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(backendUrl + "/api/doctor/logout", { withCredentials: true })
      if (data.success) {
        setCurrentDoc(false);
        setProfileData(null)
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
      setIsMobileMenuOpen(false);
    }
  }


  return (
    currentDoc
      ?
      <button
        disabled={loader}
        className="cursor-pointer transition-all duration-200 text-red-600 px-3 py-2 max-lg:w-full hover:bg-indigo-50"
        onClick={logout}
      >
        {loader
          ?
          <Loader2 className='w-5 animate-spin text-gray-500 mx-auto' />
          :
          <LogOut size={18} strokeWidth={2} />
        }
      </button>
      :
      <Link
        to={"/login"}
        onClick={() => setIsMobileMenuOpen(false)}
        className='flex items-center gap-1 bg-indigo-500 px-6 py-3 rounded-full text-white'
        >
        <LogOut className="w-5 h-5" />
        Login
      </Link>
  )
}

export default LogoutComponent