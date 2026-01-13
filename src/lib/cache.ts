// Simple in-memory cache for admin data
// This reduces database queries and improves perceived performance

interface CacheEntry<T> {
  data: T
  timestamp: number
}

const cache = new Map<string, CacheEntry<unknown>>()

// Default TTL: 30 seconds (enough to feel fast, short enough to stay fresh)
const DEFAULT_TTL = 30 * 1000

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined
  if (!entry) return null

  // Check if expired
  if (Date.now() - entry.timestamp > DEFAULT_TTL) {
    cache.delete(key)
    return null
  }

  return entry.data
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

export function invalidateCache(keyPattern?: string): void {
  if (!keyPattern) {
    cache.clear()
    return
  }

  // Delete all keys matching the pattern
  for (const key of cache.keys()) {
    if (key.includes(keyPattern)) {
      cache.delete(key)
    }
  }
}

// Invalidate specific caches when data changes
export function invalidateQuotesCache() {
  invalidateCache('quotes')
}

export function invalidateAppointmentsCache() {
  invalidateCache('appointments')
}
