import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function ActionCard({ to, icon: Icon, title, description, primary = false }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${primary ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700' : 'border  hover:border-indigo-200 bg-white'}`}
    >
      <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${primary ? 'bg-white/15 text-white' : 'bg-indigo-50 text-indigo-600'}`}
      >
        <Icon size={22} strokeWidth={2} />
      </span>
      <span className="flex-1 min-w-0">
        <span className={['block font-semibold', primary ? 'text-white' : 'text-gray-900'].join(' ')}>
          {title}
        </span>
        <span className={['block text-sm mt-0.5', primary ? 'text-white/80' : 'text-gray-600'].join(' ')}>
          {description}
        </span>
      </span>
      <ChevronRight
        size={18}
        className={[
          'shrink-0 transition-transform group-hover:translate-x-0.5',
          primary ? 'text-white/70' : 'text-gray-400',
        ].join(' ')}
      />
    </Link>
  )
}
