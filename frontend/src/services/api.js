import axios from 'axios'

// In dev this stays '/api' and goes through the Vite proxy (vite.config.js).
// In production, set VITE_API_BASE_URL to the deployed backend's full URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Backend origin only (no /api suffix), used to resolve relative asset URLs
// like scan.imageUrl ("/uploads/xxx.jpg") returned by the API.
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '')

const api = axios.create({
  baseURL: API_BASE_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.includes('/auth/')

    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('token')
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?sessionExpired=1'
      }
    }

    return Promise.reject(error)
  }
)

export default api
