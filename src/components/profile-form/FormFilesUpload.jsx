import React, { useCallback } from 'react'
import { Upload, AlertCircle } from 'lucide-react'

const FormFilesUpload = (
    {
        register,
        profilePreview,
        licensePreview,
        setProfileImg,
        setLicenseImg,
        errors, setError, clearErrors
    }
) => {



    // Production-grade file validator
    const validateFile = useCallback((file, fieldName) => {
        try {
            const maxSize = 500 * 1024; // 500KB in bytes
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

            if (!file) {
                setError?.(fieldName, {
                    type: 'required',
                    message: 'File is required'
                });
                return false;
            }

            // Check file size
            if (file.size > maxSize) {
                setError?.(fieldName, {
                    type: 'fileSize',
                    message: 'File size must be less than 500KB'
                });
                return false;
            }

            // Check MIME type (primary validation)
            if (!allowedTypes.includes(file.type)) {
                setError?.(fieldName, {
                    type: 'fileType',
                    message: 'Only JPG, JPEG, PNG, and WebP images are allowed'
                });
                return false;
            }

            // Check file extension (secondary validation for security)
            const fileName = file.name.toLowerCase();
            const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

            if (!hasValidExtension) {
                setError?.(fieldName, {
                    type: 'fileExtension',
                    message: 'Invalid file extension. Use .jpg, .jpeg, .png, or .webp'
                });
                return false;
            }

            // Clear errors if validation passes
            clearErrors(fieldName);
            return true;
        } catch (error) {
            console.log(error)
        }
    }, []);



    // Handle profile image change
    const handleProfileImg = useCallback(async (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file, 'profile')) {
            setProfileImg(file);
        } else {
            e.target.value = ''; // Reset input
        }
    }, [validateFile]);



    // Handle Aadhar image change
    const handleLicenseImg = useCallback(async (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file, 'license')) {
            setLicenseImg(file);
        } else {
            e.target.value = ''; // Reset input
        }
    }, [validateFile]);




    return (
        <div>
            <h1 className="text-lg sm:text-xl mb-2 flex items-center gap-2">
                <Upload />Upload Images
            </h1>
            <div className="flex justify-around gap-10 flex-wrap p-4 sm:p-8">

                {/* Profile Image */}
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="profile-img" className="cursor-pointer flex flex-col gap-1 items-center">
                            <img
                                src={profilePreview}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <p className="text-center text-sm">
                                Upload Profile Picture
                                <span className="text-red-500">*</span>
                            </p>
                            <p className="text-xs text-black/50">Max 500KB; JPG, JPEG, PNG, WEBP only</p>
                        </label>
                        {errors?.profile && (
                            <div className="flex items-center gap-1 text-red-500 text-xs">
                                <AlertCircle size={12} />
                                <span>{errors.profile.message}</span>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        id="profile-img"
                        hidden
                        accept=".jpg,.jpeg,.png,.webp,image/jpg, image/jpeg,image/png,image/webp"
                        {...register("profile")}
                        onChange={handleProfileImg}
                    />
                </div>

                {/* Aadhar Image */}
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="license-img" className="cursor-pointer flex flex-col gap-1 items-center">
                            <img
                                src={licensePreview}
                                alt="license"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <p className="text-center text-sm">
                                Upload License Card
                                <span className="text-red-500">*</span>
                            </p>
                            <p className="text-xs text-black/50">Max 500KB; JPG, JPEG, PNG, WEBP only</p>
                        </label>
                        {errors?.license && (
                            <div className="flex items-center gap-1 text-red-500 text-xs">
                                <AlertCircle size={12} />
                                <span>{errors.license.message}</span>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        id="license-img"
                        hidden
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        {...register("license")}
                        onChange={handleLicenseImg}
                    />
                </div>
            </div>
        </div>
    )
}

export default FormFilesUpload