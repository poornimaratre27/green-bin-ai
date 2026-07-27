import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const QuickActionCard = ({ label, description, icon: Icon, gradient, to, onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) return onClick()
    if (to) navigate(to)
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 text-left shadow-sm ring-1 ring-gray-100 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10 dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-100">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-gray-500" />
    </button>
  )
}

export default QuickActionCard
