import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import toast from "react-hot-toast";
import { Appointment, DateChip, EmptyState } from '../../components';
import axios from 'axios';
import { CalendarX2, Loader2 } from 'lucide-react';



const DoctorAppointments = () => {
  const { backendUrl, appointments, setAppointments, profileData, getNext7Days } = useContext(DoctorContext);
  const nearestDate = getNext7Days(Object.keys(profileData?.availability?.workingDays))[0]?.date || null;

  const [selectedDate, setSelectedDate] = useState(nearestDate)
  const [loader, setLoader] = useState(false);

  const getAppointments = async () => {
    if (!profileData) {
      return toast.info("Please complete your profile on profile page")
    }
    try {
      setLoader(true);
      const res = await axios.get(`${backendUrl}/api/doctor/get-appointments`, {
        params: { date : selectedDate },
        withCredentials: true
      });
      if (res.data.success) {
        setAppointments(res.data.appointment || null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  }


  useEffect(() => {
    if (selectedDate) {
      getAppointments();
    }
  }, [selectedDate])




  return (
    <div className='max-w-2xl mx-auto px-4 sm:px-6 py-10'>
      <h1 className="text-xl font-bold text-gray-900 mb-1">Appointments</h1>
      <p className="text-sm text-gray-600 mb-5">Tap a date to jump straight to that day's list.</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {getNext7Days(Object.keys(profileData?.availability?.workingDays)).map(({ date, display }) => (
          <DateChip
            key={date}
            date={date}
            active={date === selectedDate}
            onClick={() => setSelectedDate(date)}
          />
        ))}
        <form className="text-sm sm:text-lg flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
          <input
            type="date"
            id="appointment-date"
            className="border border-gray-300 rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all duration-300 shadow-sm text-sm"
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </form>
      </div>

      <div className='rounded-2xl border bg-white overflow-hidden'>
        {
          appointments && !loader
            ?
            <Appointment appointments={appointments} />
            :
            (
              loader
                ?
                <Loader2 className="animate-spin mx-auto my-4 text-gray-600 w-5" />
                :
                <EmptyState
                  icon={CalendarX2}
                  title='No appointments on this date'
                  description='Nothing booked for this day yet.'
                />
            )
        }
      </div>
    </div>
  )
}

export default DoctorAppointments

