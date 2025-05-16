import { useState, useContext, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from 'lucide-react'
import GoogleLogo from "../../assets/google2.svg";
import { DoctorContext } from "../../context/DoctorContext";



const Signup = ({ setState }) => {
    const [email, setEmail] = useState("");
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [loader, setLoader] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { backendUrl, setCurrentDoc, recaptchaSiteKey } = useContext(DoctorContext);
    const recaptchaRef = useRef(null); // Ref to control reCAPTCHA


    const handleSendOTP = async (data) => {
        if (cooldown > 0) return toast.warn(`Please wait ${cooldown}s before resending`);
        try {
            setLoader(true);
            const res = await axios.post(backendUrl + '/api/doctor/sendotp-signup', { email: data.email });
            if (res.data.success) {
                setEmail(data.email)
                toast.success(res.data.message);
                setShowOTPInput(true);
                setCooldown(30); 
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data || 'An error occurred');
        } finally {
            setLoader(false)
        }
    };



    const onSubmit = async (data) => {
        if (!recaptchaRef.current) {
            return toast.warn("reCAPTCHA not loaded, wait for few seconds");
        }

        try {
            setLoader(true);
            // Execute reCAPTCHA v3 programmatically
            const token = await recaptchaRef.current.executeAsync();
            if (!token) {
                return toast.warn("Please refresh the page to verify reCAPTCHA");
            }
            data.reCaptcha = token; // Add token to form data

            const response = await axios.post(backendUrl + '/api/doctor/register', { ...data, email }, {
                withCredentials: true,
            });

            if (response.data.success) {
                setCurrentDoc(true);
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.errors ? response.data.errors[0].msg : response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error("Error:", error);
        } finally {
            setLoader(false);
            reset();
            if (recaptchaRef.current) {
                recaptchaRef.current.reset(); // Reset reCAPTCHA after submission
            }
        }
    };



    const handleGoogleLogin = () => {
        window.location.href = `${backendUrl}/api/doctor/google`;
    };


    useEffect(() => {
        if (cooldown > 0) {
            const interval = setInterval(() => setCooldown(c => c - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [cooldown]);


    return (
        <div className='text-slate-700'>
            <p className="text-center my-1 text-xl">Doctor Signup</p>
            {
                !showOTPInput
                    ?
                    <>
                        <div className="oauth flex flex-col gap-4 items-center">
                            <button
                                onClick={handleGoogleLogin}
                                className="hover:ring-1 hover:ring-indigo-700 w-60 py-3 flex gap-2 justify-center items-center shadow-lg rounded-lg transition-all duration-300"
                            >
                                <img className="w-8" src={GoogleLogo} alt="google-logo" />
                                Continue With Google
                            </button>
                        </div>
                        <div className="my-6 flex gap-4 items-center">
                            <hr className="bg-gray-400 h-0.5 border-0 flex-grow" />
                            <span className="mx-2">Or</span>
                            <hr className="bg-gray-400 h-0.5 border-0 flex-grow" />
                        </div>
                        <form onSubmit={handleSubmit(handleSendOTP)} className='text-sm space-y-4'>
                            <input
                                type="email"
                                className="border w-full px-4 py-1 border-slate-400 outline-primary"
                                placeholder="Enter your email to verify"
                                {...register("email", {
                                    required: "Please enter your email",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                            <button
                                disabled={loader}
                                className={`text-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-sm py-1 hover:bg-opacity-85 transition-all duration-300 ${loader && "bg-opacity-85"
                                    } flex justify-center items-center`}
                            >
                                {loader ? (
                                    <Loader2 className="w-4 animate-spin" />
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        </form>
                    </>
                    :
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                            <input
                                type="number"
                                placeholder='Enter OTP'
                                {...register('otp', {
                                    required: "Please enter OTP",
                                    minLength: { value: 4, message: "OTP must be at least 4 digits" },
                                    maxLength: { value: 6, message: "OTP cannot exceed 6 digits" },
                                })
                                }
                                className="border w-full px-4 py-1 border-slate-400 outline-primary"
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
                            )}
                            <div>
                                <input
                                    type="password"
                                    placeholder='Enter a strong password'
                                    {...register("password", {
                                        required: true,
                                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    })
                                    }
                                    className="border w-full px-4 py-1 border-slate-400 outline-primary"
                                />
                                <p className='text-[10px] mt-1 text-slate-500'><span className='text-red-600'>*</span>Password must contain uppercase, lowercase, special character and number</p>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={recaptchaSiteKey}
                                onError={() => toast.error("reCAPTCHA failed to load")}
                                size="invisible" // For v3 compatibility
                                badge="bottomright" // Position badge
                            />
                            <button
                                type='submit'
                                disabled={loader}
                                className={`text-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-sm py-1 hover:bg-opacity-85 transition-all duration-300 ${loader && "bg-opacity-85"
                                    } flex justify-center items-center`}
                            >
                                {loader ? (
                                    <Loader2 className="w-4 animate-spin" />
                                ) : (
                                    "Signup"
                                )}
                            </button>
                        </form>
                        <button
                            disabled={cooldown > 0}
                            onClick={() => setShowOTPInput(false)} className='text-indigo-700 hover:underline mt-2'>Resend OTP in {cooldown}s
                        </button>
                    </>

            }
            <p className='mt-2 text-indigo-700 cursor-pointer hover:underline' onClick={() => setState("Login")}>Back to Login</p>
        </div>
    )
}

export default Signup