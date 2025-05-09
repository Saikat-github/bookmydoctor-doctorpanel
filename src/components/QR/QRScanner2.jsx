
//Here only one scanning functionlity will be available - using camera(html5-qrcode)

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { formatDate } from '../../assets/assets';
import { RippleLoader, MinimalLoader } from '../utility components/ElegantLoader';

const QRScanner = () => {
    const [loader, setLoader] = useState(false);
    const [scanError, setScanError] = useState('');
    const [scanSuccess, setScanSuccess] = useState('');
    const [patientDetails, setPatientDetails] = useState(null);
    
    const { backendUrl } = useContext(DoctorContext);

    useEffect(() => {
        // Create instance of QR Scanner
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        // Handle successful scan
        const handleScanSuccess = async (decodedText) => {
            // scanner.pause();
            setLoader(true);
            try {
                const response = await axios.post(backendUrl + '/api/user/verify-appointment', {
                    qrCodeData: decodedText
                }, { withCredentials: true });
                if (response.data.success) {
                    setScanSuccess(response.data.message);
                    setPatientDetails(response.data.patientDetails);
                } else {
                    setScanError(response.data.message);
                }
            } catch (error) {
                setScanError('Failed to verify QR code. Please try again.');
                console.error('QR verification error:', error);
            } finally {
                setLoader(false);
            }
        };

        // Handle scan failure
        const handleScanFailure = (error) => {
            // Ignore the frequent failure results during normal scanning
            if (error?.name === 'ChunkLoadError') {
                setScanError('Camera error. Please check permissions and try again.');
                console.error('QR scanner error:', error);
            }
        };

        // Render scanner
        scanner.render(handleScanSuccess, handleScanFailure);

        // Cleanup
        return () => {
            scanner.clear();
        };
    }, []);

    const resetScanner = () => {
        setScanError('');
        setScanSuccess('');
        setPatientDetails(null);
        window.location.reload(); // Refresh to reset scanner
    };

    if (loader) {
        return <MinimalLoader />
    }




    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div id="reader" className="w-full"></div>

            {scanError && (
                <p className='text-lg text-red-600 text-center my-10'>{scanError}</p>
            )}

            {scanSuccess && (
                <div className="mt-4 text-slate-800 ">
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

            {(scanError || scanSuccess) && (
                <button
                    onClick={resetScanner}
                    className="w-full mt-4 bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-600 transition-all duration-300"
                >
                    Scan Another
                </button>
            )}
        </div>
    );
};

export default QRScanner;