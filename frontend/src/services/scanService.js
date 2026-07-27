import api from './api'

export const analyzeWasteImage = (file) => {
  const formData = new FormData()
  formData.append('image', file)

  return api.post('/scans/analyze', formData).then((res) => res.data)
}

export const fetchScanHistory = (category) => {
  const params = category ? { category } : {}
  return api.get('/scans', { params }).then((res) => res.data)
}

export const fetchScanStats = () => api.get('/scans/stats').then((res) => res.data)
