import { useState } from "react";
import ConfirmationModal from "../utils/ConfirmationModal";
import { Trash2 } from 'lucide-react';
import toast from "react-hot-toast";
import axios from 'axios'



const DeleteButtons = ({ checkAuthStatus, backendUrl, profileId }) => {
    const [loader, setLoader] = useState(false);
    const [btnType, setBtnType] = useState(null);



    const onConfirmDelete = async () => {
        setLoader(true);
        try {
            let url;
            if (btnType === "account") {
                url = backendUrl + "/api/doctor/delete-account"
            } else if (btnType === "profile") {
                url = backendUrl + "/api/doctor/delete-profile"
            }
            const { data } = await axios.delete(url, {
                withCredentials: true
            });
            if (data.success) {
                toast.success(data.message);
                checkAuthStatus();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setBtnType(null);
            setLoader(false);
        }
    }



    return (
        <div>
            {
                profileId
                &&
                <button
                    onClick={() => setBtnType("profile")}
                    type="button"
                    className="flex items-center gap-2 py-2 px-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white transition-all duration-300 hover:brightness-110 text-xs sm:text-sm my-2"
                >
                    <Trash2 className="w-4 h-4" /> Delete Profile Data
                </button>
            }

            <button
                onClick={() => setBtnType("account")}
                type="button"
                className="flex items-center gap-2 py-2 px-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white transition-all duration-300 hover:brightness-110 text-xs sm:text-sm"
            >
                <Trash2 className="w-4 h-4" /> Delete Login Account
            </button>
            <ConfirmationModal
                btnType={btnType}
                onConfirm={onConfirmDelete}
                onCancel={() => setBtnType(null)}
                loader={loader}
            />
        </div>
    )
}

export default DeleteButtons