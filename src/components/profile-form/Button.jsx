import React from 'react'

const Button = ({ type = "submit", className = "", children, ...props }, ref) => {
  return (
    <button 
    type={type} 
    disabled={disabled} 
    className={`my-4 py-2 px-10 bg-orange-600 text-white rounded-full w-36 hover:bg-orange-700 transition-all duration-300 ${className}`}>{children}</button>
  )
}

export default Button