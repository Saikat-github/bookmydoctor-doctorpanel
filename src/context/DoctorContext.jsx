import { createContext, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const userPanelUrl = import.meta.env.VITE_USERPANEL_URL;
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const [currentDoc, setCurrentDoc] = useState(null);
    const [loader, setLoader] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeSlotsByDay, setTimeSlotsByDay] = useState([]);
      const [appointments, setAppointments] = useState([]);



    const getProfileData = async () => {
        try {
            setLoader(true);
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
        } finally {
            setLoader(false);
        }
    }


    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/doctor/current_user', {
                withCredentials: true
            });
            if (response.data.success) {
                // User is logged in
                setCurrentDoc(response.data.user)
                return true;
            } else {
                // User is not logged in
                setCurrentDoc(null);
                return false;
            }
        } catch (error) {
            return false;
        }
    };



    const getNext7Days = (availableDays) => {
        const days = [];
        const today = new Date();
        const options = { weekday: "long" };

        for (let i = 0; i < 7; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            futureDate.setHours(0, 0, 0, 0); // Ensures no timezone shift

            const dayName = futureDate.toLocaleDateString("en-US", options);

            if (availableDays?.includes(dayName)) {
                days.push({
                    date: futureDate.toLocaleDateString("en-GB").split("/").reverse().join("-"), // Corrected for local time
                    display: `${dayName} (${futureDate.toLocaleDateString("en-GB")})`,
                });
            }
        }
        return days;
    };



    useEffect(() => {
        if (currentDoc) {
            getProfileData();
        }
    }, [currentDoc]);



    const value = { backendUrl, currentDoc, setCurrentDoc, loader, setLoader, profileData, setProfileData, getProfileData, checkAuthStatus,selectedDays, setSelectedDays, timeSlotsByDay, setTimeSlotsByDay, appointments, setAppointments, userPanelUrl, getNext7Days, recaptchaSiteKey };



    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;