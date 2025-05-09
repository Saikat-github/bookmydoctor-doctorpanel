import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BadgeCheck, XCircle, Info } from "lucide-react";
import { MinimalLoader } from '../../components/utility components/ElegantLoader.jsx';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loader, setLoader] = useState(false);
    const [payments, setPayments] = useState([])
    const { backendUrl, profileData } = useContext(DoctorContext);
    const navigate = useNavigate()


    useEffect(() => {
        if (profileData) {
            fetchPayments()
        }
    }, [])


    const fetchPayments = async () => {
        try {
            setLoader(true);
            const res = await axios.get(backendUrl + "/api/doctor/payment-allpayments",
                {
                    params: { cursor },
                    withCredentials: true
                },
            )

            if (res.data.success) {
                setPayments([...payments, ...res.data.payments]);
                setCursor(res.data.nextCursor);
                setHasNextPage(res.data.hasNextPage);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoader(false)
        }
    }


    if (!profileData) {
        return <p className='text-center text-sm my-20 text-slate-700'>No Payment History Found <br />
            Please complete your profile on <span onClick={() => navigate("/doctor-profile")} className='text-indigo-600 cursor-pointer'>profile page.</span></p>
    }


    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Payment History</h2>
            <div className="space-y-4">
                {payments.map((payment, idx) => (
                    <div
                        key={payment._id}
                        className="border border-slate-300 rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:shadow-md transition text-xs sm:text-sm"
                    >
                        <div className="space-y-1">
                            <p className="text-gray-700 font-medium">
                                Order ID: <span className="text-gray-900">{payment.orderId}</span>
                            </p>
                            <p className="text-gray-700 font-medium">
                                Payment ID: <span className="text-gray-900">{payment.paymentId}</span>
                            </p>
                            <p className="text-gray-700 font-medium">
                                Amount: <span className="text-green-600 font-bold">₹{payment.amount}</span>
                            </p>
                            <p className="text-gray-500 text-sm">
                                {new Date(payment.createdAt).toLocaleString('en-IN', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </p>
                            {
                                payment.status !== 'paid'
                                &&
                                <p className='text-slate-600 text-[10px] flex gap-1'>
                                    <Info className="w-4 h-4" /> If any money has been deducted from your a/c, then refresh the page or it'll get refunded within 7 business days.
                                </p>
                            }
                        </div>
                        <div className="flex items-center space-x-2">
                            {payment.status === "paid" ? (
                                <span className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                                    <BadgeCheck className="h-4 w-4 mr-1" />
                                    Success
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Failed
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {loader && <MinimalLoader />}
            {hasNextPage && (
                <button
                    onClick={fetchPayments}
                    className="block mx-auto mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                    Load More...
                </button>
            )}
        </div>
    )
}

export default Payments