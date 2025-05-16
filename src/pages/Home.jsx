import { useNavigate } from 'react-router-dom'
import { CalendarCheck, BarChart3, Headset } from 'lucide-react';



const Home = () => {

  const navigate = useNavigate();
  return (
    <div>
        <div className="flex p-4 justify-center flex-col items-center my-10 gap-10">
          <button onClick={() => navigate("/doctor-appointments")} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-110">
            <CalendarCheck className="w-10 h-10" />
            See Appointments
          </button>

          <button onClick={() => navigate("/doctor-dashboard")} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-110">
            <BarChart3 className="w-10 h-10" />
            See Patients Stats
          </button>

          <a href='#footer' className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-300 hover:scale-110">
            <Headset className="w-10 h-10" />
            Contact Support
          </a>
        </div>
    </div>
  )
}

export default Home