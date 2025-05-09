import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios'
import DaySlotWithTimeSlots from './dayslots/DaySlotWithTimeslots';
import Input from './form elements/Input';
import Select from './form elements/Select';
import { DoctorContext } from '../context/DoctorContext';
import { isEmptyObject } from '../utils/util1';
import { X } from 'lucide-react';
import { assets, doctorSpecialities } from '../assets/assets';
import DeleteAccount from "./DeleteAccount";




const Form = ({ isEdit, setIsEdit = () => { }, profileData }) => {
  const [docImg, setDocImg] = useState(null);
  const { backendUrl, getProfileData, checkAuthStatus, timeSlotsByDay, setTimeSlotsByDay } = useContext(DoctorContext);

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm();


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




  const onsubmit = async (data) => {
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
  };

  // Helper function to reset form state
  const resetForm = () => {
    // reset(); // Uncomment if using react-hook-form
    setDocImg(null);
    setTimeSlotsByDay({});
    if (typeof setIsEdit === 'function') {
      setIsEdit(false);
    }
  };




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
            <img src={docImg ? URL.createObjectURL(docImg) : (profileData?.personalInfo?.image || assets.upload_area)} className='w-20 rounded-full bg-gray-100 cursor-pointer' />
          </label>
          <input {...register("image")} type="file" id='doc-img' onChange={(e) => setDocImg(e.target.files[0])} hidden />
          <p>Upload Your <br />Picture<span className='text-red-600'>*</span></p>
        </div>




        {/* Left Section*/}
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-medium text-slate-700 '>Personal Info</p>

          <Input type="text" placeholder="Your Name" label="Enter Your Name" {...register("name")} required
          />

          <Input type="email" placeholder="Your Email" label="Email" {...register("email")} required
          />

          <Input type="date" placeholder="dd-mm-yyyy" label="Date of Birth" {...register("dob")} required
          />

          <Input type="text" placeholder="Select Languages" label="Languages Spoken" {...register("language")}
          />






          <p className='text-xl font-medium text-slate-700'>Clinic Info</p>

          <textarea type="text" placeholder="Detailed address" className={`py-2 px-3 border border-gray-700 w-full  rounded-sm mt-2`} label="Clinic Address" {...register("clinicAddress")} required
          ></textarea>

          <Input
            type="text"
            label="City/Town (Not from any city/town, please enter your nearest city/town)"
            placeholder="Enter city or town name"
            {...register("city")}
            required
          />

          <Input
            type="text"
            label="Clinic Pincode"
            placeholder="Enter PIN Code"
            {...register("pincode", {
              pattern: {
                value: /^[1-9][0-9]{5}$/,
                message: "Invalid pincode. Must be 6 digits and not start with 0.",
              },
            })}
            required
          />
          {errors.pincode && <p className="text-red-600 text-xs">{errors.pincode.message}</p>}

          <Input type="number" placeholder="Clinic Phone Number" label="Enter Ph Number" {...register("clinicPh", {
            required: "Phone number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit mobile number starting with 6-9"
            }
          })} required
          />
          {errors.clinicPh && <p className="text-red-600 text-xs">{errors.clinicPh.message}</p>}

          <Input type="number" placeholder="In Minutes" label="Approximate CheckUp Time" {...register("avgCheckTime", {
            required: "Check-up time is required",
            min: { value: 1, message: "Check-up time must be greater than 0" }
          })} required
          />
          {errors.avgCheckTime && <p className="text-red-600 text-xs">{errors.avgCheckTime.message}</p>}

          <Input type="number" placeholder="Your Fees" label="Visiting Fees" {...register("fees", {
            required: "Fees are required",
            min: { value: 1, message: "Fees must be greater than 0" }
          })} required
          />
          {errors.fees && <p className="text-red-600 text-xs">{errors.fees.message}</p>}

          <Input type="number" placeholder="To avoid over booking" label="Max Daily Appointments" {...register("maxAppointment", {
            required: "Max daily appointments are required",
            min: { value: 1, message: "Minimum value is 1" },
            max: { value: 100, message: "Maximum value is 100" }
          })} required
          />
          {errors.maxAppointment && <p className="text-red-600 text-xs">{errors.maxAppointment.message}</p>}

          <div className='w-full'>
            <p>Available Days
              <span className="text-red-600">*</span>
              <br />(You can change your availability status anytime, after submitting this form)
            </p>
            <DaySlotWithTimeSlots />
          </div>
        </div>








        {/* Right Section */}
        <div className='flex flex-col gap-4'>

          <p className='text-xl font-medium text-slate-700'>Professional Info</p>

          <Input type="text" placeholder="Degree" label="Degree" {...register("degree")} required
          />
          {errors.degree && <p className="text-red-600 text-xs">{errors.degree.message}</p>}

          <Input type="text" placeholder="In Years" label="Experience" {...register("experience", {
            required: "Experience is required",
            min: { value: 0, message: "Experience must be a positive number" }
          })} required
          />
          {errors.experience && <p className="text-red-600 text-xs">{errors.experience.message}</p>}

          <Select placeholder="Please select your speciality" options={doctorSpecialities} label="Speciality" {...register("speciality")} required
          />

          <Input type="text" placeholder="Registration Number" label="Medical Registration Number" {...register("regNumber", {
            minLength: { value: 5, message: "Registration number must be at least 5 characters" }
          })}
          />
          {errors.regNumber && <p className="text-red-600 text-xs">{errors.regNumber.message}</p>}

          <Input type="file" label="Medical License Document/Certificate" {...register("licenseDocument")} required
          />

          <div>
            <p>Write something about you</p>
            <textarea rows={6} className='py-2 px-3 border border-gray-700 rounded-sm w-full mt-2' placeholder='Write about doctor' {...register("about", {
              maxLength: {
                value: 500, // character limit, not word limit
                message: "Maximum 300 characters or approx. 50 words.",
              },
            })}></textarea>
            {errors.about && <p className="text-red-600 text-xs">{errors.about.message}</p>}
          </div>

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
        <button type='submit' disabled={isSubmitting} className={`mt-2 py-2 px-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-36 transition-all duration-300`}>{isSubmitting ? <div className='border-2 border-white w-4 h-4 animate-spin rounded-full border-t-transparent'></div> : (profileData ? "Edit" : "Submit")}</button>
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
      <DeleteAccount checkAuthStatus={checkAuthStatus} backendUrl={backendUrl}/>
    </div>
  )
}

export default Form
