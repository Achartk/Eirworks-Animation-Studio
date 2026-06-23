import { storage, KEYS } from './storage'

/**
 * Analytics tracker — records page visits with timestamps
 * Data is stored in localStorage as an array of visit events
 */

export function trackVisit(page) {
  const now = new Date()
  const today = now.toISOString().split('T')[0] // YYYY-MM-DD
  const hour = now.getHours()

  const analytics = storage.get(KEYS.ANALYTICS, {
    visits: [],
    pageViews: {},
    hourly: {},
    totalVisits: 0,
  })

  // Add visit event
  analytics.visits.push({
    page,
    timestamp: now.toISOString(),
    date: today,
    hour,
    userAgent: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
  })

  // Keep only last 500 visits to avoid localStorage overflow
  if (analytics.visits.length > 500) {
    analytics.visits = analytics.visits.slice(-500)
  }

  // Page view counts
  analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1

  // Hourly distribution
  analytics.hourly[hour] = (analytics.hourly[hour] || 0) + 1

  // Total
  analytics.totalVisits = (analytics.totalVisits || 0) + 1

  storage.set(KEYS.ANALYTICS, analytics)
}

export function getAnalytics() {
  return storage.get(KEYS.ANALYTICS, {
    visits: [],
    pageViews: {},
    hourly: {},
    totalVisits: 0,
  })
}

/**
 * Returns visits grouped by date for last N days
 */
export function getVisitsByDay(days = 14) {
  const analytics = getAnalytics()
  const result = {}

  // Initialize all dates
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    result[key] = 0
  }

  // Count visits per day
  analytics.visits.forEach((v) => {
    if (result.hasOwnProperty(v.date)) {
      result[v.date]++
    }
  })

  return result
}

/**
 * Returns hourly distribution (0–23)
 */
export function getHourlyDistribution() {
  const analytics = getAnalytics()
  const result = {}
  for (let i = 0; i < 24; i++) result[i] = 0
  Object.entries(analytics.hourly || {}).forEach(([h, c]) => {
    result[parseInt(h)] = c
  })
  return result
}

/**
 * Returns visits for today
 */
export function getTodayVisits() {
  const today = new Date().toISOString().split('T')[0]
  const analytics = getAnalytics()
  return analytics.visits.filter(v => v.date === today).length
}

/**
 * Returns visits for this week
 */
export function getWeekVisits() {
  const analytics = getAnalytics()
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return analytics.visits.filter(v => new Date(v.timestamp) >= weekAgo).length
}

/**
 * Device type split
 */
export function getDeviceSplit() {
  const analytics = getAnalytics()
  const mobile = analytics.visits.filter(v => v.userAgent === 'Mobile').length
  const desktop = analytics.visits.length - mobile
  return { mobile, desktop }
}

/**
 * Reset analytics (for testing)
 */
export function resetAnalytics() {
  storage.remove(KEYS.ANALYTICS)
}
