import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { Search, Download, Phone, CalendarX2, X } from "lucide-react";
import { converToJustDate } from "../../utils/ConverDate";
import EmptyState from "./EmptyState";



const Appointment = ({ appointments }) => {
  const [query, setQuery] = useState('')
  const { allPatients, appointmentDate, totalSerialNumber } = appointments;
  const componentRef = useRef(null);

  const q = query.trim().toLowerCase()
  const filteredPatients = q
    ? (allPatients || []).filter((p) => p.patientName.toLowerCase().includes(q) || p.phoneNumber.includes(q))
    : allPatients

  const isAbsent = new Date() > new Date(appointmentDate)

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    onPrintError: (error) => {
      toast.error("Printing failed. Please try again.");
      console.log("Print error:", error);
    },
    removeAfterPrint: true,
    bodyClass: "print-body",
  });



  return (
    <div ref={componentRef}>
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-border">
        <div>
          <p className="text-sm text-gray-600">Appointment date</p>
          <p className="font-semibold text-gray-900 flex items-center gap-2">{converToJustDate(appointmentDate)}
            <span className="w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700">
              {totalSerialNumber}
            </span>
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-700 transition-colors"
          onClick={handlePrint}
        >
          <Download size={15} /> Export
        </button>
      </div>


      {/* Search Bar */}
      <div className="p-5 border-b relative">
        <Search size={16} className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by patient name or phone"
          className="w-full rounded-lg border-2 bg-indigo-100/20 pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 outline-none transition-colors"
        />
        {query && 
        <X 
        size={16} 
        className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={() => setQuery("")}
        />
        }
      </div>

      {/* Patients Section */}
      <ul className="space-y-2 p-5">
        {
          filteredPatients?.length > 0
            ?
            filteredPatients.map((patient, index) => (
              <li
                key={index}
                className="flex gap-4 items-center justify-between border p-4 rounded-xl"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700">
                  {patient.serialNumber}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{patient.patientName}</p>
                  <p className="flex items-center gap-1.5 text-sm text-gray-600 mt-0.5">
                    <Phone size={13} /> {patient.phoneNumber}
                  </p>
                </div>

                <p className={`text-xs capitalize font-semibold py-1 px-2 rounded-full ${patient.status === "verified" ? "bg-green-400/20 text-green-500" : (
                  isAbsent
                    ?
                    "bg-red-400/20 text-red-500"
                    : "bg-gray-400/20 text-gray-500"
                )}`}>
                  {patient.status === "verified" ? "Verified" : (isAbsent ? "Absent" : "Booked")}
                </p>
              </li>
            ))
            :
            <EmptyState
              icon={CalendarX2}
              title='No matching patients'
              description='Try a different name or phone number.'
            />
        }
      </ul>
    </div>
  );
};

export default React.memo(Appointment);