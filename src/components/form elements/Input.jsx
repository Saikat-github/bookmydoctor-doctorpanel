import React, { useId } from 'react'

const Input = ({ placeholder, type = "text", className = "", label, required, ...props }, ref) => {

  const id = useId();

  return (
    <div>
      {label 
      &&
      <label htmlFor={id}>{label} {required && <span className='text-red-600'>*</span>}</label>
      }
      <input
        ref={ref}
        type={type}
        className={`py-2 px-3 border border-gray-700 w-full  rounded-sm mt-2 ${className}`}
        placeholder={placeholder}
        {...props}
        id={id}
      />
    </div>
  )
}

export default React.forwardRef(Input);