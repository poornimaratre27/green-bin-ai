export const BADGE_TIERS = [
  { key: 'starter', name: 'Getting Started', description: 'Complete your first scan', threshold: 1 },
  { key: 'recycler', name: 'Recycler', description: 'Scan 5 items', threshold: 5 },
  { key: 'eco-warrior', name: 'Eco Warrior', description: 'Scan 15 items', threshold: 15 },
  { key: 'eco-champion', name: 'Eco Champion', description: 'Scan 30 items', threshold: 30 },
  { key: 'eco-legend', name: 'Eco Legend', description: 'Scan 50 items', threshold: 50 }
]

export const getBadgeProgress = (itemsRecycled) => {
  const badges = BADGE_TIERS.map((tier) => ({
    ...tier,
    earned: itemsRecycled >= tier.threshold
  }))

  const nextTier = BADGE_TIERS.find((tier) => itemsRecycled < tier.threshold)

  const progress = nextTier
    ? {
        current: itemsRecycled,
        target: nextTier.threshold,
        percent: Math.round((itemsRecycled / nextTier.threshold) * 100),
        nextBadge: nextTier.name
      }
    : {
        current: itemsRecycled,
        target: itemsRecycled,
        percent: 100,
        nextBadge: null
      }

  return { badges, progress }
}
