import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import menu_icon from './menu_icon.svg'
import qrcodeDark from './qrcode-dark.svg'
import qrcodeLight from './qrcode-light.svg'
import downloadIcon from './download-solid.svg'
import userSolid from './user-solid.svg'
import logoutIcon from './power-off-solid.svg'
import reactIcon from './react.svg'
import crossIcon from './circle-xmark-regular.svg'
import diamond from './gem-regular.svg'
import dollar from './dollar-sign-solid.svg'
import creditCard from './credit-card-solid.svg'



export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    menu_icon,
    qrcodeDark,
    qrcodeLight,
    downloadIcon,
    userSolid,
    logoutIcon,
    reactIcon,
    crossIcon,
    diamond,
    dollar,
    creditCard
}


export const formatDate = (date) => {
    const formattedDate = date
  .split("T")[0]  // Extract date part "YYYY-MM-DD"
  .split("-")     // Split into ["YYYY", "MM", "DD"]
  .reverse()      // Reverse to ["DD", "MM", "YYYY"]
  .join("-");     // Join back to "DD-MM-YYYY"

  return formattedDate;

}



export const doctorSpecialities = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Psychiatrist",
  "General Practitioner",
  "Gynecologist",
  "Ophthalmologist",
  "Oncologist",
  "Urologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Nephrologist",
  "Rheumatologist",
  "Anesthesiologist",
  "Otolaryngologist (ENT Specialist)",
  "Hematologist",
  "Radiologist",
  "Pathologist",
  "Allergist/Immunologist",
  "Plastic Surgeon",
  "Emergency Medicine Specialist",
  "Infectious Disease Specialist",
  "Sports Medicine Specialist",
  "Geriatrician",
  "Podiatrist",
  "Medical Geneticist",
  "Reproductive Endocrinologist", 
  "Other"
];
