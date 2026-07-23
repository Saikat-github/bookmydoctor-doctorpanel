import { ClipboardList, CheckCircle2, XCircle, ChevronDown } from 'lucide-react'
import StatCard from './StatCard'


const PatientStats = ({ stats }) => {
  const {totalPatients, verifiedPatients, nonVerifiedPatients, genderCount } = stats || {}
  
  
  return (
    <div className="">
       <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Attendance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCard icon={ClipboardList} label="Total Patients" value={totalPatients} tone="neutral"/>
          <StatCard icon={CheckCircle2} label="Attended" value={verifiedPatients} tone="success"/>
          <StatCard icon={XCircle} label="Non-attended" value={nonVerifiedPatients} tone="danger" />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Demographics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border p-5 bg-white">
            <p className="text-2xl font-extrabold text-gray-900">{genderCount?.male}</p>
            <p className="text-sm text-gray-600 mt-1">Male</p>
          </div>
          <div className="rounded-2xl border p-5 bg-white">
            <p className="text-2xl font-extrabold text-gray-900">{genderCount?.female}</p>
            <p className="text-sm text-gray-600 mt-1">Female</p>
          </div>
          <div className="rounded-2xl border p-5 bg-white">
            <p className="text-2xl font-extrabold text-gray-900">{genderCount?.other}</p>
            <p className="text-sm text-gray-600 mt-1">Others</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PatientStats