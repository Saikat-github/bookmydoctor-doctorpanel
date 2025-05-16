import { useState, useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { PatientStats } from "../../components";
import { Loader2 } from 'lucide-react'
import { getStartEndDate } from "../../utils/ConverDate";

const DoctorDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const { backendUrl, profileData } = useContext(DoctorContext);

  const fetchStats = async (startDate, endDate) => {
    if (!profileData) {
      return toast.info("Please complete your profile on profile page")
    }
    if (!startDate <= endDate) {
      toast.error("Start date should be less than end date");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(backendUrl + "/api/doctor/patient-stats", {
        params: {
          startDate,
          endDate,
        },
        withCredentials: true,
      })
      if (res.data.success) {
        setStats(res.data.stats)
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const { startDate, endDate } = getStartEndDate(filter);
    if (startDate && endDate) {
      fetchStats(startDate, endDate)
    }
  }, [filter]);



  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen text-slate-700">
      <h1 className="text-2xl font-semibold mb-4 text-center">Patients Stats</h1>
      <div className="flex gap-4 mb-6 sm:mb-10 sm:text-sm text-xs justify-center">
        <div className="flex justify-center items-center">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="px-1 py-1 rounded shadow-lg shadow-slate-400 bg-white focus:ring-2 focus:ring-slate-600 focus:outline-none text-slate-700"
          >
            <option value="">Filter</option>
            <option value="today">📆 Today</option>
            <option value="thisWeek">🗓️ This Week</option>
            <option value="lastWeek">⬅️ Last Week</option>
            <option value="thisMonth">📅 This Month</option>
            <option value="lastMonth">⬅️ Last Month</option>
            <option value="lastSixMonths">⬅️ Last 6 months</option>
          </select>
        </div>
      </div>
      {loading
        ?
        (
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
        )
        :
        (
          stats && <PatientStats stats={stats} />
        )}
    </div>
  );
};

export default DoctorDashboard;
