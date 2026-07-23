import React from 'react'

const EmptyState = ({ icon: Icon, title, description}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-gray-400 mb-4">
        <Icon size={22} strokeWidth={2} />
      </span>
      <p className="font-semibold text-gray-900">{title}</p>
      {description && <p className="text-sm text-gray-600 mt-1 max-w-xs">{description}</p>}
    </div>
  )
}

export default EmptyState