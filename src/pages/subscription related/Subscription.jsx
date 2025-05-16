import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext.jsx';
import { SubscriptionStat } from '../../components/index.js';
import { useNavigate } from 'react-router-dom';



export default function Subscription() {
  const { profileData } = useContext(DoctorContext);
  const subscription = profileData?.subscription || null;
  const navigate = useNavigate()

  if (!profileData) {
    return <p className='text-center text-sm my-20 text-slate-700'>Please complete your profile on <span onClick={() => navigate("/doctor-profile")} className='text-indigo-600 cursor-pointer'>profile page</span> to get <br />14-day free trial.</p>
  }

  return (
    <>
      {
        subscription
        &&
        <SubscriptionStat subscription={subscription} />
      }
    </>
  );
}