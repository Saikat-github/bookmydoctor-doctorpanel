import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { DoctorContext } from '../../context/DoctorContext';
import { useNavigate } from 'react-router-dom';



const ForgetPassword = () => {
    const [email, setEmail] = React.useState('');
    const [showOTPInput, setShowOTPInput] = React.useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [loader, setLoader] = useState(false);

    const { backendUrl } = useContext(DoctorContext);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (cooldown > 0) return toast.warn(`Please wait ${cooldown}s before resending`);
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error("Please enter a valid email");
        }

        try {
            setLoader(true);
            const res = await axios.post(backendUrl + '/api/doctor/forgot-password', { email });
            if (res.data.success) {
                toast.success(res.data.message);
                setShowOTPInput(true);
                setCooldown(30);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data || 'An error occurred');
        } finally {
            setLoader(false);
        }
    };



    const handleResetPassword = async (data) => {
        const { newPassword, confirmPassword, otp } = data;
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post(backendUrl + '/api/doctor/reset-password', data);
            if (res.data.success) {
                toast.success(res.data.message);
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                res.data?.errors ? toast.error(res.data.errors[0].msg) : toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data || 'An error occurred');
        }
    };



    useEffect(() => {
        if (cooldown > 0) {
            const interval = setInterval(() => setCooldown(c => c - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [cooldown]);



    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg text-sm">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Reset Password</h2>

            {!showOTPInput ? (
                <form onSubmit={handleSendOTP} className=' space-y-4'>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        className="border w-full px-4 py-1 border-slate-400 outline-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        disabled={loader}
                        type="submit"
                        className="text-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-sm py-1 hover:bg-opacity-85 transition-all duration-300 flex justify-center items-center disabled:opacity-50"
                    >
                        {loader ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                    <p className=' text-center mt-2 text-indigo-700 cursor-pointer font-medium' onClick={() => navigate("/login")}>Back to Login</p>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit(handleResetPassword)} className=' space-y-2 '>
                        <div className="">
                            <label className="block text-gray-700 mb-1">Enter OTP</label>
                            <input
                                type="number"
                                {...register('otp', {
                                    required: "Please enter OTP",
                                    minLength: { value: 4, message: "OTP must be at least 4 digits" },
                                    maxLength: { value: 6, message: "OTP cannot exceed 6 digits" },
                                })
                                }
                                className="w-full p-2 border border-gray-400 rounded"
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
                            )}
                        </div>
                        <div className="">
                            <label className="text-gray-700 mb-1">
                                New Password
                                <p className='text-[10px] text-slate-500'><span className='text-red-600'>*</span>Password must contain uppercase, lowercase, special character and number</p>
                            </label>
                            <input
                                type="password"
                                {...register("newPassword", {
                                    required: true,
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                })
                                }
                                className="w-full p-2 border border-gray-400 rounded"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>
                        <div className="">
                            <label className="block text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: true,
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                })
                                }
                                className="w-full p-2 border border-gray-400 rounded"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="text-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-sm py-2 hover:bg-opacity-85 transition-all duration-300 flex justify-center items-center disabled:opacity-50"
                        >
                            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </form>
                    <button
                        disabled={cooldown > 0}
                        onClick={() => setShowOTPInput(false)} className='text-indigo-700 hover:underline mt-3 '>Resend OTP in {cooldown}s
                    </button>
                    <p className='text-indigo-700 cursor-pointer hover:underline' onClick={() => navigate("/login")}>Back to Login</p>
                </>
            )}

        </div>
    )
}

export default ForgetPassword