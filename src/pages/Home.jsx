import { CalendarCheck, BarChart3, Headphones, ChevronRight } from 'lucide-react'
import { ActionCard } from '../components';



const Home = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, Doctor</h1>
        <p className="text-gray-600 mt-1">What would you like to do?</p>
      </div>

      <div className="flex flex-col gap-3">
        <ActionCard
          to="/doc-appointments"
          icon={CalendarCheck}
          title="See Appointments"
          description="Today's schedule and upcoming bookings"
          primary={true}
        />
        <ActionCard
          to="/doc-stats"
          icon={BarChart3}
          title="See Patient Stats"
          description="Attendance and patient demographics"
        />
        <ActionCard
          to="/doc-support"
          icon={Headphones}
          title="Contact Support"
          description="Get help with your account or bookings"
        />
      </div>
    </div>
  )
}

export default Home