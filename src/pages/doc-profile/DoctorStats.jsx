import { useState, useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { PatientStats } from "../../components";
import { ClipboardList, CheckCircle2, XCircle, ChevronDown } from 'lucide-react'



const DoctorStats = () => {
  const [filter, setFilter] = useState("today");

  const { stats, profileData, getPatientStats } = useContext(DoctorContext);

  useEffect(() => {
    if (filter) {
      getPatientStats(filter)
    }
  }, [filter]);



  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-xl font-bold text-gray-900">Patient Stats</h1>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="appearance-none rounded-lg border border-border bg-surface pl-3 pr-9 py-2 text-sm font-medium text-ink-900 focus:border-primary-400 outline-none cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="lastWeek">Last Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
        </div>
      </div>

      {
        stats && <PatientStats stats={stats} />
      }
    </div>
  );
};

export default DoctorStats;
