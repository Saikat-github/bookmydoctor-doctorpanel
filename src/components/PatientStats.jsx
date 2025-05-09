import React from 'react'
import { FaMale, FaFemale, FaGenderless } from "react-icons/fa";



const PatientStats = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-10 max-sm:text-sm">
      <div className="bg-gradient-to-r from-slate-700 to-slate-500 text-slate-700 shadow-2xl p-4 rounded flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
        <div className="flex items-center gap-6 bg-white p-4 rounded">
          <div>
            <div className="text-blue-500 w-8 h-8 mr-3">📋</div>
            <p className="">Total Patients</p>
          </div>
          <h2 className="text-xl font-bold">{stats.totalPatients}</h2>
        </div>

        <div className="flex items-center gap-6 bg-white p-4 rounded">
          <div className=''>
            <div className="text-red-500 w-8 h-8 mr-3">✔️</div>
            <p className="">Attended Patients</p>
          </div>
          <h2 className="text-xl font-bold">{stats.verifiedPatients}</h2>
        </div>

        <div className="flex items-center gap-6 bg-white p-4 rounded">
          <div className=''>
            <div className="text-red-500 w-8 h-8 mr-3">❌</div>
            <p className="">Non-attended Patients</p>
          </div>
          <h2 className="text-xl font-bold">{stats.nonVerifiedPatients}</h2>
        </div>

      </div>

      <div className="bg-gradient-to-r from-slate-700 to-slate-500 text-slate-700 shadow-2xl p-4 rounded flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
        {/* Male Stats */}
        <div className="flex items-center gap-6 bg-white p-4 rounded">
          <div className="w-1/2">
            <FaMale className="text-blue-500 text-3xl" />
            <p className="text-sm uppercase">Male</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.genderStats?.MALE}</h2>
        </div>

        {/* Female Stats */}
        <div className="flex items-center gap-6 bg-white p-4 rounded">
          <div className="w-1/2">
            <FaFemale className="text-pink-400 text-3xl" />
            <p className="text-sm uppercase text-slate-700">Female</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.genderStats?.FEMALE}</h2>
        </div>

        {/* Other Stats */}
        <div className="flex items-center gap-6 bg-white p-4 rounded">
          <div className="w-1/2">
            <FaGenderless className="text-yellow-400 text-3xl" />
            <p className="text-sm uppercase text-slate-700">Others</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.genderStats?.OTHER}</h2>
        </div>
      </div>
    </div>
  )
}

export default PatientStats