import React, { useContext, useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext';
import { isEmptyObject } from '../utils/util1';
import { X, Loader2 } from 'lucide-react';
import { assets } from '../assets/assets';
import DeleteAccount from "./DeleteAccount";
import FormPersonalInfo from './form elements/FormPersonalInfo';
import FormClinicInfo from './form elements/FormClinicInfo';
import FormProfessionalInfo from './form elements/FormProfessionalInfo';
import { useCallback } from 'react';




const Form = ({ isEdit, setIsEdit = () => { }, profileData }) => {
  const [docImg, setDocImg] = useState(null);
  const { backendUrl, getProfileData, checkAuthStatus, timeSlotsByDay, setTimeSlotsByDay } = useContext(DoctorContext);

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm();

  const previewUrl = useMemo(() => {
    return docImg
      ? URL.createObjectURL(docImg)
      : (profileData?.personalInfo?.image || assets.upload_area);
  }, [docImg, profileData?.personalInfo?.image]);


  useEffect(() => {
    if (profileData) {
      const dob = new Date(profileData.personalInfo.dob);
      const formattedDob = dob.toISOString().split('T')[0];
      reset({
        // Personal Info
        name: profileData.personalInfo.name,
        email: profileData.personalInfo.email,
        image: profileData.personalInfo.image,
        dob: formattedDob,
        language: profileData.personalInfo.language,

        // Clinic Info
        clinicAddress: profileData.clinicInfo.address,
        fees: profileData.clinicInfo.fees,
        clinicPh: profileData.clinicInfo.phoneNumber,
        avgCheckTime: profileData.clinicInfo.avgCheckTime,
        maxAppointment: profileData.clinicInfo.maxAppointment,
        pincode: profileData.clinicInfo.pincode,

        // Professional Info
        degree: profileData.professionalInfo.degree,
        experience: profileData.professionalInfo.experience,
        speciality: profileData.professionalInfo.speciality,
        regNumber: profileData.professionalInfo.regNumber,
        licenseDocument: profileData.professionalInfo.licenseDocument,

        // Availability
        isAvailable: profileData.availability.isAvailable,

        // Other fields
        termsAndPolicy: profileData.termsAndPolicy
      });
    }
  }, [profileData, reset]);


  const resetForm = useCallback(() => {
    reset();
    setDocImg(null);
    setTimeSlotsByDay({});
    if (typeof setIsEdit === 'function') {
      setIsEdit(false);
    }
  }, [reset, setIsEdit, setTimeSlotsByDay]);


  const onsubmit = useCallback(async (data) => {
    try {
      // Early validation checks
      const validationErrors = {
        timeSlots: isEmptyObject(timeSlotsByDay) && isEmptyObject(profileData?.availability?.workingDays),
        image: !docImg && !profileData?.personalInfo?.image
      };

      if (validationErrors.timeSlots) {
        throw new Error("Please choose your available days and times");
      }
      if (validationErrors.image) {
        throw new Error("Please upload doctor image");
      }

      // Prepare form data
      const formData = new FormData();

      // Handle file uploads
      if (docImg) {
        formData.append("image", docImg);
      }
      formData.append("licenseDocument", data.licenseDocument[0]);

      // Add other form fields
      Object.entries(data)
        .filter(([key, value]) => value != null && key !== "licenseDocument")
        .forEach(([key, value]) => formData.append(key, value));

      // Add working days if available
      if (!isEmptyObject(timeSlotsByDay)) {
        formData.append("workingDays", JSON.stringify(timeSlotsByDay));
      }

      // Make API request
      const endpoint = profileData
        ? `${backendUrl}/api/doctor/update-profile`
        : `${backendUrl}/api/doctor/add-doctor`;

      const response = await axios.post(endpoint, formData, {
        withCredentials: true
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Handle success
      toast.success(response.data.message);
      resetForm();
      getProfileData();
      checkAuthStatus();

    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  }, [docImg, profileData, timeSlotsByDay])



  return (
    <div className='pt-2 px-6 sm:px-12'>
      {!isEdit && <p className='text-sm font-medium borde py-2 text-center w-72 border-orange-600 text-slate-700 mx-auto my-4 shadow-md shadow-slate-500'>Submit your details carefully and get 14 days free trial
      </p>}

      {/* Form Section */}
      <form onSubmit={handleSubmit(onsubmit)} className='bg-white flex gap-6 text-xs sm:text-sm flex-col my-4 text-gray-700 rounded-md shadow-2xl px-6 sm:px-20 py-4 sm:py-10'>
        <div className='flex justify-end'>
          {isEdit &&
            <X
              onClick={() => setIsEdit(false)}
              className='w-6 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer'>
            </X>}
        </div>
        <div className='flex gap-4 items-center'>
          <label htmlFor="doc-img">
            <img src={previewUrl} className='w-20 rounded-full bg-gray-100 cursor-pointer' />
          </label>
          <input {...register("image")} type="file" id='doc-img' onChange={(e) => setDocImg(e.target.files[0])} hidden />
          <p>Upload Your <br />Picture<span className='text-red-600'>*</span></p>
        </div>


        {/* Left Section*/}
        <div className='flex flex-col gap-4'>
          <FormPersonalInfo register={register} errors={errors} />
          <FormClinicInfo register={register} errors={errors} />
        </div>

        {/* Right Section */}
        <div className='flex flex-col gap-4'>
          <FormProfessionalInfo register={register} errors={errors} />
        </div>

        {/* Terms and Condition */}
        <div className=' flex items-center gap-1'>
          <input className='cursor-pointer' type="checkbox" {...register("termsAndPolicy")} required />
          <p>By continuing, I agree to the{" "}
            <a
              href='/termsandcondition'
              className="text-blue-500 underline cursor-pointer">Terms & Conditions</a>
            &nbsp; and &nbsp;
            <a
              href='/privacypolicy'
              className="text-blue-500 underline cursor-pointer">Privacy Policy
            </a> of bookmydoctor
          </p>
        </div>

        {/* Button */}
        <button type='submit' disabled={isSubmitting} className={`mt-2 py-2 px-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-36 transition-all duration-300`}>
          {isSubmitting ?
            <Loader2 className="w-4 animate-spin" />
            :
            (profileData ? "Edit" : "Submit")}
        </button>
        {
          profileData
          &&
          <p
            onClick={() => setIsEdit(false)}
            className="py-2 px-10 border border-gray-800 rounded-full bg-black text-white transition-all duration-300 hover:bg-opacity-90 w-36 text-center cursor-pointer"
          >
            Cancel
          </p>
        }
      </form>


      <DeleteAccount checkAuthStatus={checkAuthStatus} backendUrl={backendUrl} />
    </div>
  )
}

export default Form
