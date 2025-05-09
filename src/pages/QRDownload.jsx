import React, { useContext, useRef, useState } from 'react';
import { QRCodeSVG } from "qrcode.react";
import { assets } from "../assets/assets.js"
import { toast } from 'react-toastify';
import { toPng } from 'html-to-image';
import { DoctorContext } from '../context/DoctorContext.jsx';
import { Download} from 'lucide-react';

const QRDownload = ({ title = "Scan & Book Appointment", logo = assets.reactIcon, size = 200 }) => {
    const [loader, setLoader] = useState(false);
    const { userPanelUrl, profileData } = useContext(DoctorContext);

    const componentRef = useRef(null);
    const bookingUrl = `${userPanelUrl}/appointments/${profileData?._id}`



    // Function to download as high-quality PNG image
    const downloadAsImage = async () => {
        if (!profileData) {
            return toast.info("Please complete your profile on profile page")
        }
        setLoader(true);
        try {
            if (componentRef.current) {
                // Get accurate dimensions of the component
                const { offsetWidth, offsetHeight } = componentRef.current;

                // Add extra padding to ensure nothing gets cut
                const paddingX = 0; // Extra padding on each side
                const paddingY = 0; // Extra padding on top and bottom

                // Convert component to high-quality PNG with proper dimensions
                const dataUrl = await toPng(componentRef.current, {
                    quality: 1.0,
                    pixelRatio: 3, // Higher resolution for better quality
                    width: offsetWidth + (paddingX * 2),
                    height: offsetHeight + (paddingY * 2),
                    cacheBust: true,
                    canvasWidth: offsetWidth + (paddingX * 2),
                    style: {
                        margin: `${paddingY}px ${paddingX}px`,
                        boxShadow: 'none'
                    }
                });

                // Create a link to download the image
                const link = document.createElement('a');
                link.download = `${title.replace(/\s+/g, '-')}-qrcode.png`;
                link.href = dataUrl;
                link.click();

                toast.success("QR Code image downloaded successfully!");
            }
        } catch (error) {
            console.error("Error downloading image:", error);
            toast.error("Failed to download QR Code as image. Contact support for help.");

            // Try fallback method with lower quality
            // fallbackImageDownload();
        } finally {
            setLoader(false);
        }
    };


    

    return (
        <div className='flex flex-col items-center justify-center gap-4 mt-6'>
            <div className="flex flex-col items-center justify-center mx-10 p-4 bg-sky-950" ref={componentRef}>
                {/* Title above QR code */}
                {title && (
                    <h3 className="text-xl font-medium text-center text-white mb-4">{title}</h3>
                )}

                {/* QR code with logo */}
                <div className="flex justify-center items-center mb-6 p-1 bg-white rounded-md">
                    <QRCodeSVG
                        value={bookingUrl}
                        size={size}
                        level={"H"} // High error correction level to accommodate logo
                        includeMargin={true}
                        imageSettings={{
                            src: logo,
                            x: undefined, // Centered by default
                            y: undefined,
                            height: 50, // Adjust logo size
                            width: 50,
                            excavate: true, // Clears background behind the logo
                        }}
                    />
                </div>

                {/* Details below QR code */}
                <h2 className='text-lg font-medium mt-2 text-white border-b-2'>Dr. {profileData?.personalInfo?.name}</h2>
            </div>


            {/* Download button */}
            <button
                disabled={loader}
                onClick={downloadAsImage}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
                <Download className="w-5 h-5" />
                {loader ? "Downloading..." : "Download"}
            </button>
        </div>
    );
};

export default QRDownload;
