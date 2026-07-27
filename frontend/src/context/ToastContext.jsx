import { createContext, useCallback, useState } from 'react'

export const ToastContext = createContext(null)

let idCounter = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'info') => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 4000)
    },
    [removeToast]
  )

  return <ToastContext.Provider value={{ toasts, showToast, removeToast }}>{children}</ToastContext.Provider>
}
