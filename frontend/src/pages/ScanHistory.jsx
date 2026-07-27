import { useState, useEffect } from 'react'
import { fetchScanHistory } from '../services/scanService'
import useToast from '../hooks/useToast'
import ScanHistoryCard from '../components/ScanHistoryCard'
import PageLoader from '../components/PageLoader'

const CATEGORIES = ['All', 'Recyclable', 'Organic', 'Hazardous', 'E-Waste', 'General Waste']

const ScanHistory = () => {
  const [scans, setScans] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { showToast } = useToast()

  useEffect(() => {
    setLoading(true)
    setError('')

    fetchScanHistory(category === 'All' ? undefined : category)
      .then((data) => setScans(data))
      .catch((err) => {
        const message = err.response?.data?.message || 'Failed to load scan history'
        setError(message)
        showToast(message, 'error')
      })
      .finally(() => setLoading(false))
  }, [category, showToast])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Scan History</h1>
          <p className="text-gray-500 dark:text-gray-400">All the items you've scanned, newest first.</p>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      {loading ? (
        <PageLoader label="Loading scans..." />
      ) : scans.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No scans found{category !== 'All' ? ` in "${category}"` : ''}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scans.map((scan) => (
            <ScanHistoryCard key={scan._id} scan={scan} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScanHistory
