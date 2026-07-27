const store = new Map()

export const withCache = async (key, ttlMs, fetcher) => {
  const entry = store.get(key)

  if (entry && Date.now() < entry.expiresAt) {
    return entry.value
  }

  const value = await fetcher()
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
  return value
}
