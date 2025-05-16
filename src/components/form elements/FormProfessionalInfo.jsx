import React from 'react'
import Input from './Input'
import Select from './Select'
import { doctorSpecialities } from '../../assets/assets'





const FormProfessionalInfo = ({ register, errors }) => {
    return (
        <>
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
        </>
    )
}

export default FormProfessionalInfo