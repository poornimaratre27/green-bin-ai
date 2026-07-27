import { CheckCircle2, XCircle, Gauge, Trash2, FileText, Globe2, Sparkles } from 'lucide-react'

const wasteTypeStyles = {
  Recyclable: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Organic: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Hazardous: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'E-Waste': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'General Waste': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const confidenceGradient = (confidence) => {
  if (confidence >= 80) return 'from-green-500 to-emerald-500'
  if (confidence >= 50) return 'from-amber-500 to-yellow-500'
  return 'from-red-500 to-rose-500'
}

const ScanResultCard = ({ result }) => {
  const { itemName, wasteType, confidence, recommendedBin, description, recyclable, environmentalImpact, points } =
    result

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-green-900/5 ring-1 ring-gray-100 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Identified as</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{itemName}</h2>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              wasteTypeStyles[wasteType] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {wasteType}
          </span>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
            recyclable
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
          }`}
        >
          {recyclable ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {recyclable ? 'Recyclable' : 'Not Recyclable'}
        </span>
      </div>

      <div className="relative mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" />
            AI Confidence
          </span>
          <span className="text-gray-700 dark:text-gray-200">{confidence}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${confidenceGradient(confidence)} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
          />
        </div>
      </div>

      <div className="relative mt-5 flex items-start gap-3 rounded-xl bg-green-50/70 p-4 dark:bg-green-900/20">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm">
          <Trash2 className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-green-700/70 dark:text-green-300/70">Recommended Bin</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">{recommendedBin}</p>
        </div>
      </div>

      <div className="relative mt-5">
        <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
          <FileText className="h-3.5 w-3.5" />
          Description
        </p>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>
      </div>

      <div className="relative mt-5 rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50 p-4 dark:border-teal-900/40 dark:from-teal-900/20 dark:to-emerald-900/20">
        <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
          <Globe2 className="h-3.5 w-3.5" />
          Environmental Impact
        </p>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{environmentalImpact}</p>
      </div>

      {typeof points === 'number' && (
        <div className="relative mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md">
          <Sparkles className="h-4 w-4" />+{points} Eco Points earned
        </div>
      )}
    </div>
  )
}

export default ScanResultCard
