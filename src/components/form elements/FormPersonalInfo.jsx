import React from 'react'
import Input from './Input'

const FormPersonalInfo = ({register, errors}) => {
  return (
    <>
              <p className='text-xl font-medium text-slate-700 '>Personal Info</p>
    
              <Input type="text" placeholder="Your Name" label="Enter Your Name" {...register("name")} required
              />
    
              <Input type="email" placeholder="Your Email" label="Email" {...register("email")} required
              />
    
              <Input type="date" placeholder="dd-mm-yyyy" label="Date of Birth" {...register("dob")} required
              />
    
              <Input type="text" placeholder="Select Languages" label="Languages Spoken" {...register("language")}
              /></>
  )
}

export default FormPersonalInfo