import { useContext, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import Form from '../../components/Form';
import { DoctorProfileCard } from '../../components';
import {Loader2} from 'lucide-react'


const Details = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { profileData, loader } = useContext(DoctorContext);

  if (loader) {
    return <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
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