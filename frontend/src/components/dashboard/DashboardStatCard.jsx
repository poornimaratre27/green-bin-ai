import { TrendingUp } from 'lucide-react'

const DashboardStatCard = ({ label, value, unit, icon: Icon, gradient, delta }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm ring-1 ring-gray-100 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10 dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700">
    <div
      className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-opacity duration-200 group-hover:opacity-25`}
    />

    <div className="relative flex items-center justify-between">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md transition-transform duration-200 group-hover:scale-110`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {typeof delta === 'number' && (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
          <TrendingUp className="h-3 w-3" />
          {delta > 0 ? '+' : ''}
          {delta}
          {unit === '%' ? '' : ''}
        </span>
      )}
    </div>

    <p className="relative mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="relative mt-1 text-2xl font-bold text-gray-800 dark:text-gray-100">
      {value}
      {unit && <span className="ml-1 text-base font-semibold text-gray-400 dark:text-gray-500">{unit}</span>}
    </p>
  </div>
)

export default DashboardStatCard
