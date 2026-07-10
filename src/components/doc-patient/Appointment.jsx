import React, { useRef } from "react";
import { DownloadIcon } from 'lucide-react'
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";



const Appointment = ({ appointment }) => {
  const { allPatients, appointmentDate, totalSerialNumber } = appointment;
  const componentRef = useRef(null);


  const handlePrint = useReactToPrint({
    // This is the correct prop name for current versions
    contentRef: componentRef,
    onPrintError: (error) => {
      toast.error("Printing failed. Please try again.");
      console.log("Print error:", error);
    },
    removeAfterPrint: true,
    bodyClass: "print-body",
  });


  const formattedDate = new Date(appointmentDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });


  return (
    <div className="max-w-md mx-auto bg-white shadow-lg shadow-slate-500 rounded-xl overflow-hidden my-5" ref={componentRef}>
      <div className="px-6 py-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Total Appointments: {totalSerialNumber}
          </h3>
          <DownloadIcon
            onClick={handlePrint}
            aria-label="Print appointment details"
            className="w-4 h-4 cursor-pointer hover:text-slate-950" />
        </div>

        {/* Appointment Date */}
        <p className="text-gray-600 text-sm mb-4">
          Appointment Date:{" "}
          <span className="font-medium text-gray-800">
            {formattedDate}
          </span>
        </p>

        {/* Patients Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Patients:</h3>
          <ul className="space-y-2">
            {allPatients.map((patient, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-black/10 px-4 py-2 rounded"
              >
                <span className="text-sm font-medium text-gray-700">
                  {patient.patientName || "Unknown Patient"} <br />
                  Ph: {patient.phoneNumber || "N/A"} 
                  <br />
                  Serial: {patient.serialNumber}
                </span>

                <p className={`text-sm capitalize ${patient.status === "BOOKED" ? "text-slate-800" : "text-green-600"}`}>
                  {patient.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Appointment);