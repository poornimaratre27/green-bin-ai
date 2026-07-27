const ProgressCard = ({ title, subtitle, current, target, gradient }) => {
  const percent = Math.min(100, Math.max(0, Math.round((current / target) * 100)))

  return (
    <div className="group rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm ring-1 ring-gray-100 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10 dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100">{title}</p>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{percent}%</span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  )
}

export default ProgressCard
