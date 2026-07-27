import { NavLink } from 'react-router-dom'
import { HomeIcon, UploadIcon, ScanIcon, ChatIcon, UserIcon, XIcon } from './icons'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { to: '/upload', label: 'Upload Waste', icon: UploadIcon },
  { to: '/history', label: 'Scan History', icon: ScanIcon },
  { to: '/chat', label: 'AI Chat', icon: ChatIcon },
  { to: '/profile', label: 'Profile', icon: UserIcon }
]

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
  }`

const SidebarLinks = ({ onNavigate }) => (
  <nav className="flex flex-1 flex-col gap-1 p-4">
    {navItems.map(({ to, label, icon: Icon }) => (
      <NavLink key={to} to={to} className={linkClasses} onClick={onNavigate}>
        <Icon className="h-5 w-5" />
        {label}
      </NavLink>
    ))}
  </nav>
)

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:flex md:flex-col">
        <div className="flex h-16 items-center px-6 text-lg font-semibold text-green-700 dark:text-green-400">
          GreenBin AI
        </div>
        <SidebarLinks />
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative flex h-full w-64 flex-col bg-white shadow-xl dark:bg-gray-800">
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-lg font-semibold text-green-700 dark:text-green-400">GreenBin AI</span>
              <button
                onClick={onClose}
                className="rounded p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Close menu"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <SidebarLinks onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar
