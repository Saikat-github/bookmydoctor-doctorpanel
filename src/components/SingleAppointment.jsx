import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";


const SingleAppointment = ({ appointment }) => {
  const { allPatients, appointmentDate, totalSerialNumber, doctorId, _id } = appointment;
  const componentRef = useRef(null);


  // Function to print directly
  const printComponent = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.warn("Pop-up blocked. Please allow pop-ups to print.");
      return;
    }

    // Get styles from parent document
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          // Some stylesheet rules might not be accessible due to CORS
          return '';
        }
      })
      .join('\n');

    // Clone the component
    const printContent = componentRef.current.cloneNode(true);

    // Add custom print styles
    const printStyles = `
      @media print {
        body { margin: 0; padding: 20px; }
        .appointment-container { max-width: 100%; box-shadow: none; }
      }
    `;

    // Set print window content
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${styles}\n${printStyles}</style>
        </head>
        <body>
          <div class="appointment-container">
            ${printContent.innerHTML}
          </div>
          <script>
                window.onload = function() {
                  setTimeout(() => window.print(), 500);
                };
                  window.onafterprint = function() {
                  window.close();
                };
          </script>

        </body>
      </html>
    `);

    printWindow.document.close();
  };



  return (
    <div className="max-w-md mx-auto bg-white shadow-lg shadow-slate-500 rounded-xl overflow-hidden my-5" ref={componentRef}>
      <div className="px-6 py-4">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Total Appointments : {totalSerialNumber}</h2>
          <button
            onClick={printComponent}
            className="bg-slate-800 text-white px-3 py-1 rounded-lg shadow hover:bg-slate-700 transition duration-300 cursor-pointer flex items-center gap-2"
            aria-label="Download as PDF"
          >
            <img src={assets.downloadIcon} alt="Download as PDF" className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>

        {/* Appointment Date */}
        <p className="text-gray-600 text-sm mb-4">
          Appointment Date:{" "}
          <span className="font-medium text-gray-800">
            {new Date(appointmentDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>

        {/* Patients Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Patients:</h3>
          <ul className="space-y-2">
            {allPatients.map((patient, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-lg shadow-lg"
              >
                <span className="text-sm font-medium text-gray-700">{patient.patientName || "Unknown Patient"} <br />Ph : {patient.phoneNumber || "N/A"} <br />
                  Serial : {patient.serialNumber}</span>

                <p className={`border-2 border-slate-800 px-3 py-1 rounded-lg text-xs shadow transition duration-300 text-green-600 font-semibold ${patient.status === "BOOKED" ? "text-slate-800" : "text-green-600"}`}>
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

export default SingleAppointment;
