// Mock data for the Dashboard UI only. Replace with real API data when the
// backend exposes these fields (see services/scanService.js).

export const mockStats = {
  ecoScore: { value: 782, max: 1000, delta: 12, period: 'this month' },
  itemsScanned: { value: 246, delta: 18, period: 'this month' },
  co2Saved: { value: 58.4, unit: 'kg', delta: 6.2, period: 'this month' },
  itemsRecycled: { value: 189, delta: 9, period: 'this month' }
}

export const mockRecentActivity = [
  {
    id: 'a1',
    item: 'Plastic Water Bottle',
    category: 'Recyclable',
    points: 12,
    timestamp: '2026-07-27T08:15:00',
    relativeTime: '2 hours ago'
  },
  {
    id: 'a2',
    item: 'Banana Peel',
    category: 'Organic',
    points: 8,
    timestamp: '2026-07-27T06:40:00',
    relativeTime: '4 hours ago'
  },
  {
    id: 'a3',
    item: 'Old Smartphone Battery',
    category: 'E-Waste',
    points: 25,
    timestamp: '2026-07-26T19:05:00',
    relativeTime: 'Yesterday'
  },
  {
    id: 'a4',
    item: 'Cardboard Box',
    category: 'Recyclable',
    points: 10,
    timestamp: '2026-07-26T14:22:00',
    relativeTime: 'Yesterday'
  },
  {
    id: 'a5',
    item: 'Expired Medicine',
    category: 'Hazardous',
    points: 15,
    timestamp: '2026-07-25T11:10:00',
    relativeTime: '2 days ago'
  }
]

export const mockProgress = [
  {
    id: 'p1',
    title: 'Weekly Recycling Goal',
    subtitle: '28 of 40 items sorted',
    current: 28,
    target: 40,
    gradient: 'from-green-500 to-emerald-400'
  },
  {
    id: 'p2',
    title: 'Next Badge: Green Warrior',
    subtitle: '782 of 1000 eco points',
    current: 782,
    target: 1000,
    gradient: 'from-lime-500 to-green-500'
  },
  {
    id: 'p3',
    title: 'Monthly CO₂ Target',
    subtitle: '58.4kg of 75kg saved',
    current: 58.4,
    target: 75,
    gradient: 'from-teal-500 to-emerald-500'
  }
]
