import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { Navigate } from 'react-router-dom'
import { Form, ProfileDetails } from '../../components'



const DoctorProfile = () => {
  const { profileData } = useContext(DoctorContext);

  return (
    <div>
        { profileData ? <ProfileDetails profileData={profileData}/> : <Form /> }
    </div>
  )
}

export default DoctorProfile