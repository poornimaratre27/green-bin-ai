import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const NotFound = () => {
  const { user } = useAuth() || {}

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center dark:bg-gray-900">
      <p className="text-6xl font-bold text-green-600">404</p>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Page not found</h1>
      <p className="text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist.</p>
      <Link
        to={user ? '/dashboard' : '/login'}
        className="rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
      >
        {user ? 'Back to Dashboard' : 'Back to Login'}
      </Link>
    </div>
  )
}

export default NotFound
