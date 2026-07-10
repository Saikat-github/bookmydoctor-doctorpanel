import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { Appointment } from '../../components';
import { useState } from 'react';
import axios from 'axios';



const DoctorAppointments = () => {
  const { register, handleSubmit } = useForm()
  const [loader, setLoader] = useState(false);
  const { backendUrl, appointment, setAppointment, profileData, getNext7Days } = useContext(DoctorContext);


  const getAppointments = async (data) => {
    if (!profileData) {
      return toast.info("Please complete your profile on profile page")
    }
    try {
      setLoader(true);
      const res = await axios.get(`${backendUrl}/api/doctor/get-appointments`, {
        params: { date: data.date },
        withCredentials: true
      });
      if (res.data.success) {
        setAppointment(res.data.appointment);
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




  return (
    <div className='w-full text-slate-800 space-y-2'>
      <div className="p-3 flex flex-col justify-center items-center border-b border-slate-400">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Appointment Dates for Next 7 days</h2>
        <ul className="text-gray-900 text-xs space-y-1">
          {getNext7Days(Object.keys(profileData?.availability?.workingDays)).map((day) => (
            <li key={day.date} value={day.date}>
              • {day.display}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit(getAppointments)} className="text-sm sm:text-lg flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
        <label
          htmlFor="appointment-date"
          className="text-lg sm:text-xl font-semibold text-slate-700"
        >
          Please Select a Date
        </label>
        <input
          type="date"
          id="appointment-date"
          className="border-2 border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all duration-300 shadow-sm"
          {...register("date", { required: true })}
          required
        />
        <button
          disabled={loader}
          type='submit'
          className={` px-5 py-3 rounded bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 duration-300 hover:shadow-xl transition-all duration-300"}`}
        >
          {loader ? "Loading..." : "Get Appointments"}
        </button>
      </form>

      <div>
        {
          appointment
          &&
          <Appointment appointment={appointment} />
        }
      </div>
    </div>
  )
}

export default DoctorAppointments

