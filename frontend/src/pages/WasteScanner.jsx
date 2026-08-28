import { useState, useEffect } from 'react'
import { UploadCloud, ScanLine, RotateCcw } from 'lucide-react'
import { analyzeWasteImage } from '../services/scanService'
import useToast from '../hooks/useToast'
import ScanResultCard from '../components/ScanResultCard'
import Spinner from '../components/Spinner'

const WasteScanner = () => {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { showToast } = useToast()

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    setFile(selected)
    setResult(null)
    setError('')
    setPreviewUrl(URL.createObjectURL(selected))
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setError('')
    setPreviewUrl(null)
  }

  const handleAnalyze = async () => {
    if (!file) return

    setLoading(true)
    setError('')

    try {
      const data = await analyzeWasteImage(file)
      setResult(data)
      const pointsMsg = typeof data?.points === 'number' ? ` — +${data.points} Eco Points!` : '!'
      showToast(`Scan complete${pointsMsg}`, 'success')
    } catch (err) {
      const message =
        err.response?.data?.message || (err.request ? 'Network error — please try again.' : 'Failed to analyze image')
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Waste Scanner</h1>
        <p className="text-gray-500 dark:text-gray-400">Upload a photo of an item to find out how to dispose of it.</p>
      </div>

      <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm ring-1 ring-gray-100 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-800/60 dark:ring-gray-700">
        <label
          htmlFor="waste-image"
          className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-10 text-gray-500 transition-colors hover:border-green-400 hover:bg-green-50/50 hover:text-green-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-green-500 dark:hover:bg-green-900/10 dark:hover:text-green-400"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm transition-transform group-hover:scale-110">
            <UploadCloud className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium">{file ? file.name : 'Click to upload an image'}</span>
        </label>
        <input id="waste-image" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Selected waste item"
            className="mx-auto mt-4 max-h-64 rounded-xl object-contain"
          />
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
            {error}
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-2.5 font-semibold text-white shadow-sm transition-all hover:shadow-md disabled:opacity-50"
        >
          {loading ? <Spinner className="h-4 w-4" /> : <ScanLine className="h-4 w-4" />}
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <ScanResultCard result={result} />
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 transition-colors hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Scan another item
          </button>
        </div>
      )}
    </div>
  )
}

export default WasteScanner
