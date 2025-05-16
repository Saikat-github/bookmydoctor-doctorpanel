import React from 'react'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DoctorContext } from '../../context/DoctorContext';
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const PLANS = {
    monthly: { price: 999, duration: "Per Month", planType: "monthly" },
    yearly: { price: 9999, duration: "Per Year", planType: "yearly" },
};


const Plans = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false);
    const {currentDoc, profileData, backendUrl, getProfileData, loader, setLoader } = useContext(DoctorContext);


    const currentPlan = isYearly ? PLANS.yearly : PLANS.monthly;
    const navigate = useNavigate()

    const initPayment = async (subscription) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: subscription.amount,
            currency: subscription.currency,
            name: "bookmydoctor Subscription",
            description: "Monthly/Yearly Subscription for bookmydoctor Panel",
            order_id: subscription.id,
            receipt: subscription.receipt,
            handler: async function (response) {
                try {
                    setLoader(true);
                    const res = await axios.post(
                        `${backendUrl}/api/doctor/verify-subscription`,
                        response,
                        { withCredentials: true }
                    );

                    if (res.data.success) {
                        toast.success(res.data.message);
                    } else {
                        toast.error("Payment verification failed, if any money got deducted from you bank it'll get refunded in 7 working days");
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoader(false);
                    getProfileData();
                    navigate("/subscription-details")
                }
            },
            prefill: {
                name: profileData?.personalInfo?.name,
                email: profileData?.personalInfo?.email,
                contact: profileData?.clinicInfo?.phoneNumber
            },
            theme: {
                color: "#3399cc"
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };



    const handleSubscribe = async () => {
        if (!currentDoc) {
            return toast.error("Please login to continue")
        }
        if (!profileData) {
            return toast.info("Please complete your profile on profile page");
        }

        try {
            setPaymentLoader(true);

            const res = await axios.post(
                `${backendUrl}/api/doctor/create-subscription`,
                {
                    doctorId: profileData._id,
                    planType: currentPlan.planType
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                initPayment(res.data.subscription);
            } else {
                toast.error(res.data.message || "Failed to create subscription, try again");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response ? error.response.data : error.message);
        } finally {
            setPaymentLoader(false);
        }
    };



    if (loader) {
        return <Loader2 className="w-8 h-8 animate-spin mx-auto my-10 text-indigo-600"/>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen mt-4 gap-4 mx-2">


            <div className="text-center max-sm:mt-6">
                <h2 className="text-3xl font-bold text-slate-700">Choose Your Plan</h2>
                <p className="text-slate-600 text-xs mt-2">
                    Upgrade anytime, Don't worry your next plan will start after your current plan ends.
                </p>
            </div>

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 my-2">
                    <span className="text-slate-600">Monthly</span>

                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isYearly ? 'bg-blue-600' : 'bg-slate-300'}`}
                        aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} plan`}
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}
                        />
                    </button>

                    <span className="text-slate-600">Yearly</span>
                </div>

                <p className="text-4xl font-semibold text-slate-800">
                    ₹{isYearly ? (
                        <span>{currentPlan.price}<br />16% Off</span>
                    ) : currentPlan.price}
                </p>
                <p className="text-slate-600">{currentPlan.duration}</p>

                <div className="mt-4 space-y-2 text-left">
                    <p className="flex items-center gap-2 text-slate-700">✅ Access to all features</p>
                    <p className="flex items-center gap-2 text-slate-700">✅ Realtime patient queue monitoring</p>
                    <p className="flex items-center gap-2 text-slate-700">✅ Secure QR-based verification</p>
                    <p className="flex items-center gap-2 text-slate-700">✅ 24/7 complete support</p>
                </div>

                <button
                    disabled={paymentLoader}
                    onClick={handleSubscribe}
                    className="w-full mt-6 py-2 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium transition-all duration-200 flex justify-center items-center"
                >
                    {paymentLoader ? (
                        <>
                            Loading
                            <Loader2 className='w-4 animate-spin text-white ml-2' />
                        </>
                    ) : (
                        "Upgrade Now"
                    )}
                </button>
            </div>
        </div>
    )
}

export default Plans