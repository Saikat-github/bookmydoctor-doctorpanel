import React, { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmationModal from "./utility components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { Pencil, Download, Trash2, Calendar, Phone, MapPin, Stethoscope, BadgeCheck, Building, Loader2 } from 'lucide-react';
import DeleteAccount from "./DeleteAccount";



export default function DoctorProfileCard({ data, setIsEdit }) {
    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(data?.availability.isAvailable);
    const { backendUrl, checkAuthStatus, getNext7Days } = useContext(DoctorContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const changeAvailability = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/change-availability', {
                withCredentials: true
            });
            if (data.success) {
                toast.success(data.message);
                setAvailable(data.isAvailable)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }


    const deleteProfile = async () => {
        setLoading(true);
        try {
            const { data } = await axios.delete(backendUrl + '/api/doctor/delete-profile', {
                withCredentials: true
            });
            if (data.success) {
                toast.success(data.message);
                setIsOpen(false);
                checkAuthStatus();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }



    return (


        <div className="p-4 sm:p-8 min-h-screen flex justify-center items-center ">
            <div className="bg-white shadow-lg shadow-slate-400 rounded-2xl overflow-hidden w-full max-w-4xl text-gray-800 text-sm">
                {/* Header: Doctor Info */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white sm:flex-row flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={data.personalInfo.image}
                            alt={data.personalInfo.name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold">{data.personalInfo.name}</h1>
                            <p className="flex items-center gap-1 text-sm"><Stethoscope className="w-4 h-4" /> {data.professionalInfo.speciality}</p>
                            <p className="flex items-center gap-1 text-sm text-slate-100"><BadgeCheck className="w-4 h-4" /> Degree: {data.professionalInfo.degree}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => setIsEdit(true)}
                            className="flex items-center gap-1 py-2 px-6 rounded-full bg-white text-indigo-600 font-medium text-sm shadow hover:shadow-md transition-all"
                        >
                            <Pencil className="w-4 h-4" /> Edit
                        </button>
                        <button onClick={() => navigate("/qr-download")} className="flex items-center gap-1 py-2 px-6 rounded-full bg-white text-slate-700 font-medium text-sm shadow hover:shadow-md transition-all">
                            <Download className="w-4 h-4" /> Download QR
                        </button>
                    </div>
                </div>

                {/* Availability */}
                <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <p className={`text-xl font-semibold ${available ? "text-green-600" : "text-red-600"}`}>
                            {available ? "Available Now" : "Not Available"}
                        </p>
                        {!loading ? <input onChange={changeAvailability} type="checkbox" checked={available} className="cursor-pointer" /> :
                            <Loader2 className="w-4 animate-spin" />}
                    </div>
                    <ul className="space-y-1 text-sm">
                        {Object.entries(data?.availability?.workingDays).map(([day, times]) => (
                            <li key={day}>
                                <span className="font-medium text-gray-700">{day}: </span>
                                {times.map((time, index) => (
                                    <span key={index} className="ml-2">
                                        {time.start} - {time.end}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Appointment Dates for Next 7 days:</h2>
                    <div className="bg-slate-100 sm:w-1/2 p-3 rounded-lg shadow-inner">
                        <ul className="text-gray-900 text-xs space-y-1">
                            {getNext7Days(Object.keys(data?.availability?.workingDays)).map((day) => (
                                <li key={day.date} value={day.date}>
                                    • {day.display}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Clinic Info */}
                <div className="p-6 border-t border-gray-200 space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Clinic Information</h2>
                    <p className="flex items-center gap-1"><Building className="w-4 h-4 text-slate-600" /> <span>{data.clinicInfo.city}</span></p>
                    <p className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-600" /> <span>{data.clinicInfo.address}, {data.clinicInfo.pincode}</span></p>
                    <p className="flex items-center gap-1"><Phone className="w-4 h-4 text-slate-600" /> <span>{data.clinicInfo.phoneNumber}</span></p>
                    <p><span className="font-medium text-gray-700">Fees: </span>₹{data.clinicInfo.fees}</p>
                    <p><span className="font-medium text-gray-700">Avg Check Time: </span>{data.clinicInfo.avgCheckTime} minutes</p>
                    <p><span className="font-medium text-gray-700">Max Appointments: </span>{data.clinicInfo.maxAppointment}</p>
                </div>

                {/* Professional Info */}
                <div className="p-6 border-t border-gray-200 space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Professional Information</h2>
                    <p><span className="font-medium text-gray-700">Experience: </span>{data.professionalInfo.experience} years</p>
                    <p><span className="font-medium text-gray-700">Reg Number: </span>{data.professionalInfo.regNumber}</p>
                    <a
                        href={data.professionalInfo.licenseDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline flex items-center gap-1"
                    >
                        <BadgeCheck className="w-4 h-4" /> View License Document
                    </a>
                </div>

                {/* Additional Info */}
                <div className="p-6 border-t border-gray-200 space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Additional Information</h2>
                    <p><span className="font-medium text-gray-700">Languages: </span>{data.personalInfo.language.join(", ")}</p>
                    <p><span className="font-medium text-gray-700">DOB: </span>{data.personalInfo.dob.split("T")[0]}</p>
                </div>

                {/* Delete Zone */}
                <div className="p-6 border-t border-red-200 space-y-4 mt-20">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">Danger Zone</h2>
                    <button
                        onClick={() => setIsOpen(true)}
                        type="button"
                        className="flex items-center gap-2 py-2 px-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white transition-all duration-300 hover:brightness-110 text-xs sm:text-sm"
                    >
                        <Trash2 className="w-4 h-4" /> Delete Profile Data
                    </button>
                    <DeleteAccount checkAuthStatus={checkAuthStatus} backendUrl={backendUrl}/>
                    <ConfirmationModal
                        isOpen={isOpen}
                        message="Profile"
                        onConfirm={deleteProfile}
                        onCancel={() => setIsOpen(false)}
                        loader={loading}
                    />
                </div>
            </div>
        </div>

    );
}
