import { useState } from "react";
import ConfirmationModal from "./utility components/ConfirmationModal";
import { Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import axios from 'axios'



const DeleteAccount = ({checkAuthStatus, backendUrl}) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const deleteAccount = async () => {
        setLoading(true);
        try {
            const { data } = await axios.delete(backendUrl + '/api/doctor/delete-account', {
                withCredentials: true
            });
            if (data.success) {
                toast.success(data.message);
                setIsOpen(false);
                checkAuthStatus();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }



    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="flex items-center gap-2 py-2 px-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white transition-all duration-300 hover:brightness-110 text-xs sm:text-sm"
            >
                <Trash2 className="w-4 h-4" /> Delete Login Account
            </button>
            <ConfirmationModal
                isOpen={isOpen}
                message="Account"
                onConfirm={deleteAccount}
                onCancel={() => setIsOpen(false)}
                loader={loading}
            />
        </div>
    )
}

export default DeleteAccount