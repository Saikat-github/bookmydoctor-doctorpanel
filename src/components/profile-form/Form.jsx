import React, { useContext, useState, useEffect, useMemo } from 'react'
import { useCallback } from 'react';
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import axios from 'axios'
import { X, Loader2 } from 'lucide-react';
import { assets } from '../../assets/assets';
import { DoctorContext } from '../../context/DoctorContext';
import { isEmptyObject } from '../../utils/util1';
import DeleteButtons from "../doc-profile/DeleteButtons";
import FormPersonalInfo from './FormPersonalInfo';
import FormClinicInfo from './FormClinicInfo';
import FormProfessionalInfo from './FormProfessionalInfo';
import FormFilesUpload from './FormFilesUpload';




const Form = ({ isEdit, setIsEdit = () => {}, profileData }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [licenseImg, setLicenseImg] = useState(null);
  const [loader, setLoader] = useState(false);

  const { backendUrl, getProfileData, checkAuthStatus, timeSlotsByDay, setTimeSlotsByDay } = useContext(DoctorContext);

  const { register, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm();

  const profilePreview = useMemo(() => {
    return profileImg
      ? URL.createObjectURL(profileImg)
      : (profileData?.personalInfo?.profileImg || assets.upload_area);
  }, [profileImg, profileData]);

  const licensePreview = useMemo(() => {
    return licenseImg
      ? URL.createObjectURL(licenseImg)
      : (profileData?.professionalInfo?.licenseImg || assets.upload_area);
  }, [licenseImg, profileData]);


  useEffect(() => {
    if (profileData) {
      const dob = new Date(profileData.personalInfo.dob);
      const formattedDob = dob.toISOString().split('T')[0];
      reset({
        ...profileData.personalInfo,
        dob: formattedDob,
        ...profileData.clinicInfo,
        ...profileData.professionalInfo,
        isAvailable: profileData.availability.isAvailable,
        termsAndPolicy: profileData.termsAndPolicy
      });
    }
  }, [profileData]);


  const resetForm = useCallback(() => {
    reset();
    setProfileImg(null);
    setTimeSlotsByDay([]);
    if (typeof setIsEdit === "function") {
      setIsEdit(false);
    }
  }, []);


  const onsubmit = useCallback(async (data) => {
    try {
      setLoader(true);
      const { profile, license, ...restData } = data;

      if (!profileImg && !profileData?.personalInfo?.profileImg) {
        throw new Error("Please upload profile image");
      }
      if (!licenseImg && !profileData?.professionalInfo?.licenseImg) {
        throw new Error("Please upload license image");
      }

      if (isEmptyObject(timeSlotsByDay) && isEmptyObject(profileData?.availability?.workingDays)) {
        throw new Error("Please choose your available days and times");
      }

      // Prepare form data
      const formData = new FormData();

      // Handle file uploads
      if (profileImg) formData.append("profileImg", profileImg);
      if (licenseImg) formData.append("licenseImg", licenseImg)

      // Add other form fields
      Object.entries(restData).forEach(([key, value]) => formData.append(key, value));

      // Add working days if available
      if (!isEmptyObject(timeSlotsByDay)) {
        formData.append("workingDays", JSON.stringify(timeSlotsByDay));
      }

      // Make API request
      const endpoint = profileData
        ? `${backendUrl}/api/doctor/update-profile`
        : `${backendUrl}/api/doctor/create-profile`;

      const response = await axios.post(endpoint, formData, {
        withCredentials: true
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      resetForm();
      getProfileData();
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  }, [profileImg, licenseImg, profileData, timeSlotsByDay])



  

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



        {/* Left Section*/}
        <div className='flex flex-col gap-4'>
          <FormPersonalInfo register={register} errors={errors} />
          <FormClinicInfo register={register} errors={errors} />
          <FormProfessionalInfo register={register} errors={errors} />
          <FormFilesUpload
            register={register}
            profilePreview={profilePreview}
            licensePreview={licensePreview}
            setProfileImg={setProfileImg}
            setLicenseImg={setLicenseImg}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
          />
        </div>



        {/* Terms and Condition */}
        <div className=' flex items-center gap-1'>
          <input className='cursor-pointer'
            type="checkbox" {...register("termsAndPolicy")}
            required
          />
          <p>By continuing, I agree to the{" "}
            <a
              href='/termsandcondition'
              target='_blank'
              className="text-blue-500 underline cursor-pointer">Terms & Conditions</a>
            &nbsp; and &nbsp;
            <a
              href='/privacypolicy'
              target='_blank'
              className="text-blue-500 underline cursor-pointer">Privacy Policy
            </a> of bookmydoctor
          </p>
        </div>



        {/* Button */}
        <button type='submit' disabled={loader} className={`mt-2 py-2 px-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-36 transition-all duration-300`}>
          {loader
            ?
            <Loader2 className="w-4 animate-spin" />
            :
            (profileData ? "Update" : "Submit")}
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



      <DeleteButtons
        profileId={profileData?._id}
        checkAuthStatus={checkAuthStatus}
        backendUrl={backendUrl}
      />
    </div>
  )
}

export default Form
