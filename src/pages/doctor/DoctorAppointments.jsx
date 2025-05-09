import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import SingleAppointment from '../../components/SingleAppointment';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const DoctorAppointments = () => {
  const { register, handleSubmit } = useForm()
  const [loader, setLoader] = useState(false);
  const { backendUrl, appointments, setAppointments, profileData } = useContext(DoctorContext);
  const navigate = useNavigate();


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
        setAppointments(res.data.appointments);
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
    <div className='w-full max-w-6xl my-5 text-slate-800'>
      <form onSubmit={handleSubmit(getAppointments)} className="flex flex-col items-center">
        <div className="text-sm sm:text-lg flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
          <label

            htmlFor="appointment-date"
            className="text-gray-700 font-medium"
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
        </div>

      </form>


      <div>
        {
          appointments
          &&
          appointments.map((appointment, idx) => (
            <SingleAppointment key={idx} appointment={appointment} />
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments

