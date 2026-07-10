import { useState } from 'react'
import Form from '../profile-form/Form';
import { ProfileCard } from '..';
import { Loader2 } from 'lucide-react'


const ProfileDetails = ({ profileData }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex flex-col gap-10 md:gap-20'>
      {
        !isEdit
          ?
          <ProfileCard setIsEdit={setIsEdit} data={profileData} />
          :
          <Form isEdit={isEdit} setIsEdit={setIsEdit} profileData={profileData} />
      }
    </div>
  )
}

export default ProfileDetails;