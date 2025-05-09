import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import Form from '../../components/Form';
import { DoctorProfileCard } from '../../components';
import { MinimalLoader } from '../../components/utility components/ElegantLoader';



const Details = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { currentDoc, profileData, loader } = useContext(DoctorContext);

  if (loader) {
    return <MinimalLoader />
  }

  
  return (
    <div className='flex flex-col gap-10 md:gap-20'>

      {
        !isEdit && profileData
          ?
          <DoctorProfileCard data={profileData} setIsEdit={setIsEdit} />
          :
            <Form isEdit={isEdit} profileData={profileData} setIsEdit={setIsEdit}/>
      }
    </div>
  )
}

export default Details