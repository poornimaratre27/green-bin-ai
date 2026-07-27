import { createContext, useState, useEffect } from 'react'
import { registerUser, loginUser, fetchMe } from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    fetchMe()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    localStorage.setItem('token', data.token)
    setUser(data)
    return data
  }

  const register = async (details) => {
    const data = await registerUser(details)
    localStorage.setItem('token', data.token)
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
