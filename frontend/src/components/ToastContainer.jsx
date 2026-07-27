import useToast from '../hooks/useToast'

const typeStyles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-gray-800 text-white dark:bg-gray-700'
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  if (!toasts.length) return null

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-in flex items-center gap-3 rounded-lg px-4 py-3 text-sm shadow-lg ${
            typeStyles[toast.type] || typeStyles.info
          }`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white" aria-label="Dismiss">
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
