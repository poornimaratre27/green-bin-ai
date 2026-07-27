import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'
import useToast from '../hooks/useToast'
import { MenuIcon, LogoutIcon, UserIcon, SunIcon, MoonIcon } from './icons'

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    showToast('Logged out', 'info')
    navigate('/login')
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <span className="text-lg font-semibold text-green-700 dark:text-green-400">GreenBin AI</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="rounded p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 rounded-full p-1 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <span className="hidden text-sm font-medium sm:inline">{user?.name}</span>
          <UserIcon className="h-8 w-8 rounded-full bg-green-100 p-1 text-green-700 dark:bg-green-900/40 dark:text-green-300" />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <LogoutIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
