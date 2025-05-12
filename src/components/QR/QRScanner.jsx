
//Here two scanning functionlities are available - using camera(html5-qrcode) and using file upload(jsqr)

import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { DoctorContext } from '../../context/DoctorContext';
import jsQR from 'jsqr';
import QRResult from './QRResult';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';



const QRScanner = () => {
    const [patientDetails, setPatientDetails] = useState(null);
    const [scanSuccess, setScanSuccess] = useState('');
    const [scanError, setScanError] = useState('');
    const [loading, setLoading] = useState(false);
    const [scanMode, setScanMode] = useState('camera');


    const { backendUrl, profileData } = useContext(DoctorContext);
    const fileInputRef = useRef(null);

    const processQrCode = async (decodedText) => {
        if (!profileData) {
            return toast.info("Please complete your profile on profile page")
        }
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/doctor/verify-appointment`, { qrCodeData: decodedText }, { withCredentials: true });
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
            setLoading(false);
        }
    };

    useEffect(() => {
        if (scanMode === 'camera') {
            const scanner = new Html5QrcodeScanner('reader', { qrbox: 250, fps: 5 });

            const onSuccess = (decodedText) => {
                scanner.clear(); // Stop further scanning
                processQrCode(decodedText);
            };

            scanner.render(onSuccess, () => { });

            return () => scanner.clear();
        }
    }, [scanMode]);


    const handleFileUpload = (e) => {
        if (!profileData) {
            return toast.info("Please complete your profile on profile page")
        }
        try {
            const file = e.target.files[0];
            if (!file) return;

            setLoading(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
                    qrCode ? processQrCode(qrCode.data) : setScanError("No QR Code Found");
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } catch (error) {
            setScanError(error.message)
            console.log(error)
        } finally {
            setLoading(false);
        }
    };


    const resetScanner = () => {
        setScanMode('file');
        setScanError('');
        setScanSuccess('');
        setPatientDetails(null);
    };


    if (loading) {
        return <Loader2 className='w-8 h-8 text-indigo-600 animate-spin mx-auto my-16' />
    }



    return (
        <div className="w-full max-w-md mx-auto p-4">
            {
                (scanError || scanSuccess)
                    ?
                    <>
                        <QRResult scanSuccess={scanSuccess} scanError={scanError} patientDetails={patientDetails} />
                        <button onClick={resetScanner} className='flex-1 py-2 px-3 text-sm font-medium my-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>Scan Another</button>
                    </>
                    :
                    <>
                        <div className="flex mb-4 border rounded-md overflow-hidden">
                            {['camera', 'file'].map(mode => (
                                <button key={mode} onClick={() => setScanMode(mode)} className={`flex-1 py-2 px-3 text-sm font-medium ${scanMode === mode ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-white text-slate-700 hover:bg-gray-100'}`}>
                                    {mode === 'camera' ? 'Use Camera' : 'Upload Image'}
                                </button>
                            ))}
                        </div>
                        {scanMode === 'camera' ? <div id="reader" className="w-full"></div> : (
                            <label className="block w-full py-12 border-2 border-dashed border-slate-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
                                <span className="text-slate-600 block mb-2">Click to upload QR code image</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} ref={fileInputRef} />
                            </label>
                        )}
                    </>
            }
        </div>
    );
};

export default QRScanner;
