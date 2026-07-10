import React from 'react'
import { formatDate } from '../../assets/assets'

const QRResult = ({ scanError, scanSuccess, patientDetails}) => {

    if (scanError) {
        return <p className='text-lg text-red-600 text-center my-10'>{scanError}</p>
    }

    return (
        <div>
            {scanSuccess && (
                <div className="my-4 text-slate-800 ">
                    <h1 className='text-lg font-semibold text-green-600'>Success</h1>
                    <p className='text-indigo-500'>{scanSuccess}</p>
                    {patientDetails && (
                        <div className="mt-2 text-sm max-sm:text-xs">
                            <p>Patient: {patientDetails.patientName}</p>
                            <p>Gender: {patientDetails.gender}</p>
                            <p>Serial Number: {patientDetails.serialNumber}</p>
                            <p>Phone Number: {patientDetails.phoneNumber}</p>
                            <p>Appointment Date: {formatDate(patientDetails.appointmentDate)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default QRResult