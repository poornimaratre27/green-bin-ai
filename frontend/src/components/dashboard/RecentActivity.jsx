import { Link } from 'react-router-dom'
import { Recycle, Leaf, Cpu, AlertTriangle, Trash2, Clock } from 'lucide-react'

const categoryMeta = {
  Recyclable: { icon: Recycle, classes: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  Organic: { icon: Leaf, classes: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
  Hazardous: { icon: AlertTriangle, classes: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
  'E-Waste': { icon: Cpu, classes: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
  'General Waste': { icon: Trash2, classes: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' }
}

const RecentActivity = ({ activities }) => (
  <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm ring-1 ring-gray-100 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
      <Link
        to="/history"
        className="text-sm font-medium text-green-700 transition-colors hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
      >
        View all
      </Link>
    </div>

    {!activities.length ? (
      <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        No activity yet. Scan your first item to get started.
      </p>
    ) : (
      <ul className="divide-y divide-gray-100 dark:divide-gray-700/60">
        {activities.map((activity) => {
          const meta = categoryMeta[activity.category] || categoryMeta['General Waste']
          const Icon = meta.icon

          return (
            <li
              key={activity.id}
              className="group flex items-center gap-3 py-3 transition-colors first:pt-0 last:pb-0"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.classes} transition-transform duration-200 group-hover:scale-110`}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-100">{activity.item}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  {activity.relativeTime}
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                +{activity.points} pts
              </span>
            </li>
          )
        })}
      </ul>
    )}
  </div>
)

export default RecentActivity
