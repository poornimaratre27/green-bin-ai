import { ASSET_BASE_URL } from '../services/api'

const categoryStyles = {
  Recyclable: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Organic: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Hazardous: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'E-Waste': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'General Waste': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const ScanHistoryCard = ({ scan }) => {
  const formattedDate = new Date(scan.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
      <img src={`${ASSET_BASE_URL}${scan.imageUrl}`} alt={scan.itemName} className="h-40 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{scan.itemName}</h3>
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
              categoryStyles[scan.wasteType] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {scan.wasteType}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{formattedDate}</span>
          <span className="font-medium text-green-700 dark:text-green-400">+{scan.points} pts</span>
        </div>
      </div>
    </div>
  )
}

export default ScanHistoryCard
