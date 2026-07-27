import { Sparkles, ScanLine } from 'lucide-react'

const WelcomeBanner = ({ name, ecoScore, onScanClick }) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-6 shadow-lg shadow-green-900/10 sm:p-8">
    <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
    <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-emerald-300/20 blur-2xl" />
    <div className="pointer-events-none absolute right-16 top-6 h-16 w-16 animate-pulse rounded-full bg-lime-300/20 blur-xl" />

    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Eco Score {ecoScore}
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Welcome back, {name || 'Eco Warrior'} 🌱
        </h1>
        <p className="mt-1 max-w-md text-sm text-green-50/90">
          You're making a real difference. Keep scanning waste to boost your score and unlock new badges.
        </p>
      </div>

      <button
        onClick={onScanClick}
        className="group inline-flex items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-700 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:self-center"
      >
        <ScanLine className="h-4 w-4 transition-transform group-hover:scale-110" />
        Scan Waste Now
      </button>
    </div>
  </div>
)

export default WelcomeBanner
