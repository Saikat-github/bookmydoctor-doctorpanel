import React from 'react'
import Input from './Input'
import DaySlotWithTimeSlots from '../dayslots/DaySlotWithTimeslots'




const FormClinicInfo = ({register, errors}) => {
  return (
    <>
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
    </>
  )
}

export default FormClinicInfo