import React from 'react'

const StatCard = ({ icon: Icon, label, value, tone = "neutral" }) => {
    const toneStyles = {
        neutral: 'bg-indigo-50 text-indigo-600',
        success: 'bg-green-50 text-green-600',
        danger: 'bg-red-50 text-red-600',
    }

    return (
        <div className="flex items-center gap-4 rounded-2xl border bg-white p-5">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
                <Icon size={20} strokeWidth={2} />
            </span>
            <div>
                <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
                <p className="text-sm text-gray-600 mt-1">{label}</p>
            </div>
        </div>
    )
}

export default StatCard