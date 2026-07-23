import { createContext, useState } from 'react'
import axios from 'axios';
import toast from "react-hot-toast";
import { useEffect } from 'react';
import { get } from 'react-hook-form';
import { getStartEndDate } from '../utils/ConverDate';



export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const userPanelUrl = import.meta.env.VITE_USERPANEL_URL;
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const [currentDoc, setCurrentDoc] = useState(false);
    const [loader, setLoader] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlotsByDay, setTimeSlotsByDay] = useState([]);
    const [appointments, setAppointments] = useState(null);
    const [stats, setStats] = useState(null)



    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
                withCredentials: true
            });
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    const getPatientStats = async (filter="today") => {
        const { startDate, endDate } = getStartEndDate(filter)
        if (!startDate <= endDate) {
            toast.error("Start date should be less than end date");
            return;
        }
        try {
            const res = await axios.get(backendUrl + "/api/doctor/patient-stats", {
                params: {
                    startDate,
                    endDate,
                },
                withCredentials: true,
            })
            if (res.data.success) {
                setStats(res.data.stats || {})
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/doctor/current_user', {
                withCredentials: true
            });
            if (response.data.success) {
                setCurrentDoc(true)
                await Promise.allSettled([
                    getProfileData(),
                    getPatientStats()
                ]);
                return true;
            } else {
                setCurrentDoc(false);
                return false;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            toast.error(error.message)
            setCurrentDoc(false);
            return false;
        } finally {
            setLoader(false)
        }
    };



    const getNext7Days = (availableDays) => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            futureDate.setHours(0, 0, 0, 0); // Ensures no timezone shift

            const dayName = futureDate.toLocaleDateString("en-US", { weekday: "long" });

            if (availableDays?.includes(dayName)) {
                days.push({
                    date: futureDate.toLocaleDateString("en-GB").split("/").reverse().join("-"),
                    display: `${dayName} (${futureDate.toLocaleDateString("en-GB")})`,
                });
            }
        }
        return days;
    };



    useEffect(() => {
        checkAuthStatus();
    }, []);



    const value = {
        backendUrl,
        currentDoc,
        setCurrentDoc,
        loader,
        setLoader,
        profileData,
        setProfileData,
        getProfileData,
        checkAuthStatus,
        selectedDays,
        setSelectedDays,
        timeSlotsByDay,
        setTimeSlotsByDay,
        appointments,
        setAppointments,
        userPanelUrl,
        getNext7Days,
        recaptchaSiteKey,
        isAuthenticated: currentDoc,
        stats,
        getPatientStats
    };



    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;