import React, { useId } from 'react'

const Select = ({ options = [], label, placeholder, ...props }, ref) => {

  const id = useId();


  return (
    <div>
      {label && <label htmlFor={id}>{label}{props.required && <span className='text-red-600'>*</span>}</label>}
      <select
        ref={ref}
        id={id}
        {...props}
        className='py-2 px-3 border border-gray-700 w-full  rounded-sm mt-2'>
          <option value="">{placeholder}</option>
        {options?.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)