import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from 'lucide-react'
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import GoogleLogo from "../../assets/google2.svg";



const Login = ({ setState }) => {
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { backendUrl, setCurrentDoc } = useContext(DoctorContext);

    const handleGoogleLogin = () => {
        window.location.href = `${backendUrl}/api/doctor/google`;
    };

    const onSubmit = async (data) => {
        try {
            setLoader(true);
            const response = await axios.post(`${backendUrl}/api/doctor/login`, data, {
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
            toast.error(error.response?.data?.message || "An error occurred");
            console.error("Error:", error);
        } finally {
            setLoader(false);
            reset();
        }
    };


    return (
            <div className="flex flex-col gap-2">
                <p className="text-center my-1 text-xl text-slate-700">Doctor Login</p>
                <div className="oauth flex flex-col gap-4 items-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="hover:ring-1 hover:ring-indigo-700 w-60 py-3 flex gap-2 justify-center items-center shadow-lg rounded-lg transition-all duration-300"
                    >
                        <img className="w-8" src={GoogleLogo} alt="" />
                        Continue With Google
                    </button>
                </div>
                <div className="my-4 flex gap-4 items-center">
                    <hr className="bg-gray-400 h-0.5 border-0 flex-grow" />
                    <span className="mx-2">Or</span>
                    <hr className="bg-gray-400 h-0.5 border-0 flex-grow" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <input
                            type="email"
                            placeholder='Enter email'
                            {...register("email", { required: true })}
                            className="border w-full px-2 py-1 border-slate-400 outline-primary"
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder='Enter password'
                            {...register("password", { required: true })}
                            className="border w-full px-2 py-1 border-slate-400 outline-primary"
                        />
                    </div>

                    <button
                        disabled={loader}
                        className={`text-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-sm py-1 hover:bg-opacity-85 transition-all duration-300 ${loader && "bg-opacity-85"
                            } flex justify-center items-center`}
                    >
                        {loader ? (
                            <Loader2 className="w-4 animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <div className="text-xs flex gap-1">
                    <p>Don't have an account?</p>
                    <span
                        onClick={() => setState("Signup")}
                        className="text-indigo-700 cursor-pointer"
                    >
                        Click here
                    </span>
                </div>
                <p className="text-xs cursor-pointer text-indigo-700" onClick={() => navigate("/forget-password")}>
                    Forget Password
                </p>
            </div>
    )
}

export default Login