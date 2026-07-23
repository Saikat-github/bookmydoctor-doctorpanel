import { converToJustDate, convertToDateShort } from '../../utils/ConverDate'



export default function DateChip({ date, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-indigo-600 border-indigo-600 text-white'
          : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-700',
      ].join(' ')}
    >
      {convertToDateShort(date)}
    </button>
  )
}
