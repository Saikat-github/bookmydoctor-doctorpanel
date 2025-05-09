import React from 'react'
import { BadgeCheck, Calendar, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




const SubscriptionStat = ({ subscription }) => {

    const { orderId, plan, status, startDate, endDate } = subscription;
    const navigate = useNavigate();

    const isStatusActive = status !== 'expired' ? true : false;


    return (
        <div className='my-6 space-y-8 mx-2'>
            <div className="max-w-md mx-auto bg-white rounded-xl p-6 space-y-6 shadow-md transition duration-300 border border-slate-500">
                {!isStatusActive
                    &&
                    <p className='text-red-600  sm:text-sm text-xs'>
                        *Your subscription has expired on {new Date(endDate).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                        })}, please subscribe now to use all features
                    </p>
                }
                <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-600" /> {isStatusActive ? "Subscription Details" : "Last Subscription"}
                    </h2>
                    <span className={`sm:text-sm text-xs font-medium px-3 py-1 rounded-full ${isStatusActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {status.toUpperCase()}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                        <BadgeCheck className="w-4 h-4 text-indigo-500" />
                        <span className="sm:text-sm text-xs">
                            <strong>Subscription ID:</strong> {orderId}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span className="sm:text-sm text-xs">
                            <strong>Plan:</strong> {plan.charAt(0).toUpperCase() + plan.slice(1)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span className="sm:text-sm text-xs">
                            <strong>Start Date:</strong> {new Date(startDate).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span className="sm:text-sm text-xs">
                            <strong>End Date:</strong> {new Date(endDate).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate("/checkout")}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-md hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                >
                    {status !== "expired" ? "Prepay Your Subscription & Enjoy Zero Interruptions" : "Buy Subscription"}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
            <p className="text-slate-600 text-xs text-center">
                If you have any active plan, Don't worry your next plan will start after your current plan ends.
            </p>
        </div>
    )
}

export default SubscriptionStat

