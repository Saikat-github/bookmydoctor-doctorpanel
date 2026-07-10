import { Loader2 } from "lucide-react";
import React from "react";

const ConfirmationModal = ({ btnType, onConfirm, onCancel, loader }) => {
  if (!btnType) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
      {
        loader
          ?
          <Loader2 className="text-black animate-spin" />
          :
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="text-xs sm:text-sm">
              <p className="font-semibold mb-2">The following things will happen if you delete <span className="text-indigo-600">{btnType}</span> details</p>
              {
                btnType === "profile"
                  ?
                  <div>
                    <li>Your active subscription if any, will be completely removed.</li>
                    <li>Your complete profile data will be deleted</li>
                    <li>You won't be able take appointments</li>
                    <li>People won't be able to find you on our website.</li>
                  </div>
                  :
                  <div>
                    <li>Your have to create new acount to use this platform</li>
                    <li>Your active subscription if any, will be completely removed.</li>
                    <li>Your complete profile data will be deleted</li>
                    <li>People won't be able to find you on our website.</li>
                  </div>
              }

              <p className="font-semibold mt-4">Are you sure you want to delete your <span className="text-indigo-600">{btnType}</span>?</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                disabled={loader}
                onClick={onConfirm}
                className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${loader && "cursor-not-allowed"}`}
              >
                Yes
              </button>
            </div>
          </div>
      }

    </div>
  );
};

export default ConfirmationModal;
