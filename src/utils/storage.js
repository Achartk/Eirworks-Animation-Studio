/**
 * Storage helpers for localStorage with JSON serialization
 */

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn('Storage write failed:', e)
    }
  },

  remove(key) {
    localStorage.removeItem(key)
  },
}

export const KEYS = {
  PROJECTS: 'animastudio_projects',
  SERVICES: 'animastudio_services',
  TEAM: 'animastudio_team',
  ANALYTICS: 'animastudio_analytics',
  AUTH: 'animastudio_auth',
  SITE_SETTINGS: 'animastudio_settings',
}
