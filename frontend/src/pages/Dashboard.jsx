import { useNavigate } from 'react-router-dom'
import { Leaf, ScanLine, Cloud, Recycle, MessageCircle, History, MapPin, Lightbulb, Sparkles, Quote, Target } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useToast from '../hooks/useToast'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import DashboardStatCard from '../components/dashboard/DashboardStatCard'
import QuickActionCard from '../components/dashboard/QuickActionCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import ProgressCard from '../components/dashboard/ProgressCard'
import InsightCard from '../components/dashboard/InsightCard'
import { mockStats, mockRecentActivity, mockProgress } from '../data/mockDashboardData'
import {
  fetchEcoTip,
  fetchDidYouKnow,
  fetchEnvironmentalQuote,
  fetchDailyChallenge
} from '../services/insightsService'

const Dashboard = () => {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const statCards = [
    {
      key: 'ecoScore',
      label: 'Eco Score',
      value: mockStats.ecoScore.value,
      delta: mockStats.ecoScore.delta,
      icon: Leaf,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      key: 'itemsScanned',
      label: 'Items Scanned',
      value: mockStats.itemsScanned.value,
      delta: mockStats.itemsScanned.delta,
      icon: ScanLine,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      key: 'co2Saved',
      label: 'CO₂ Saved',
      value: mockStats.co2Saved.value,
      unit: mockStats.co2Saved.unit,
      delta: mockStats.co2Saved.delta,
      icon: Cloud,
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      key: 'itemsRecycled',
      label: 'Items Recycled',
      value: mockStats.itemsRecycled.value,
      delta: mockStats.itemsRecycled.delta,
      icon: Recycle,
      gradient: 'from-lime-500 to-green-500'
    }
  ]

  const quickActions = [
    {
      key: 'scan',
      label: 'Scan Waste',
      description: 'Identify an item instantly',
      icon: ScanLine,
      gradient: 'from-green-500 to-emerald-500',
      to: '/upload'
    },
    {
      key: 'chat',
      label: 'AI Chat',
      description: 'Ask about recycling',
      icon: MessageCircle,
      gradient: 'from-emerald-500 to-teal-500',
      to: '/chat'
    },
    {
      key: 'history',
      label: 'History',
      description: 'Review past scans',
      icon: History,
      gradient: 'from-teal-500 to-cyan-500',
      to: '/history'
    },
    {
      key: 'centers',
      label: 'Recycling Centers',
      description: 'Find drop-off points',
      icon: MapPin,
      gradient: 'from-lime-500 to-green-500',
      onClick: () => showToast('Recycling centers map is coming soon!', 'info')
    }
  ]

  return (
    <div className="space-y-8">
      <WelcomeBanner name={user?.name} ecoScore={mockStats.ecoScore.value} onScanClick={() => navigate('/upload')} />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">Statistics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <DashboardStatCard key={stat.key} {...stat} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.key} {...action} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">Daily Insights</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InsightCard title="Eco Tip" icon={Lightbulb} gradient="from-green-500 to-emerald-500" fetchFn={fetchEcoTip}>
            {(data) => <p className="text-sm text-gray-600 dark:text-gray-300">{data.tip}</p>}
          </InsightCard>

          <InsightCard title="Did You Know?" icon={Sparkles} gradient="from-emerald-500 to-teal-500" fetchFn={fetchDidYouKnow}>
            {(data) => <p className="text-sm text-gray-600 dark:text-gray-300">{data.fact}</p>}
          </InsightCard>

          <InsightCard title="Environmental Quote" icon={Quote} gradient="from-teal-500 to-cyan-500" fetchFn={fetchEnvironmentalQuote}>
            {(data) => (
              <blockquote className="text-sm italic text-gray-600 dark:text-gray-300">
                “{data.quote}”
                <footer className="mt-1.5 text-xs font-medium not-italic text-gray-400 dark:text-gray-500">— {data.author}</footer>
              </blockquote>
            )}
          </InsightCard>

          <InsightCard title="Daily Challenge" icon={Target} gradient="from-lime-500 to-green-500" fetchFn={fetchDailyChallenge}>
            {(data) => (
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{data.title}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{data.description}</p>
                <span className="mt-2 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  +{data.points} pts
                </span>
              </div>
            )}
          </InsightCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
          <RecentActivity activities={mockRecentActivity} />
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">Your Progress</h2>
          <div className="space-y-4">
            {mockProgress.map((progress) => (
              <ProgressCard key={progress.id} {...progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
