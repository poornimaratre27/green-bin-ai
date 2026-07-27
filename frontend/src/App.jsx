import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import WasteScanner from './pages/WasteScanner'
import ScanHistory from './pages/ScanHistory'
import AIChat from './pages/AIChat'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<WasteScanner />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/profile" element={<ComingSoon title="Profile" />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
