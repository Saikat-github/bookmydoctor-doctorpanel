import React, { useContext } from 'react'
import AddDoctor from './AddDoctor'
import Details from './Details'
import { DoctorContext } from '../../context/DoctorContext'
import { Navigate } from 'react-router-dom'

const DoctorProfile = () => {
  const {currentDoc} = useContext(DoctorContext);

  return (
    <div>
      {
        currentDoc
        ?
        (currentDoc.profileCompleted ? <Details /> : <AddDoctor />)
        :
        <Navigate to={"/login"}/>
      }
    </div>
  )
}

export default DoctorProfile