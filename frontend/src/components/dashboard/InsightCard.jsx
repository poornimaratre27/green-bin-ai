import { useState, useEffect, useCallback } from 'react'
import { RotateCw } from 'lucide-react'
import Spinner from '../Spinner'

const InsightCard = ({ title, icon: Icon, gradient, fetchFn, children }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')

    fetchFn()
      .then(setData)
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [fetchFn])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="flex flex-col rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm ring-1 ring-gray-100 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10 dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700">
      <div className="mb-3 flex items-center gap-2.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="font-semibold text-gray-800 dark:text-gray-100">{title}</p>
      </div>

      <div className="flex-1">
        {loading && (
          <div className="flex items-center gap-2 py-4 text-sm text-gray-500 dark:text-gray-400">
            <Spinner className="h-4 w-4" />
            Loading...
          </div>
        )}

        {!loading && error && (
          <div className="py-1">
            <p className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={load}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <RotateCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data && children(data)}
      </div>
    </div>
  )
}

export default InsightCard
