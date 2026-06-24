import { createContext, useContext, useState } from 'react'
import { storage, KEYS } from '../utils/storage'

const DEFAULT_PASSWORD = 'eirworksanimation2026'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    storage.get(KEYS.AUTH, false)
  )
  const [adminPassword, setAdminPasswordState] = useState(() =>
    storage.get('animastudio_admin_password', DEFAULT_PASSWORD)
  )
  const [authError, setAuthError] = useState('')

  const login = (password) => {
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setAuthError('')
      storage.set(KEYS.AUTH, true)
      return true
    }
    setAuthError('Password salah. Coba lagi.')
    return false
  }

  const changePassword = (currentPassword, newPassword) => {
    if (currentPassword !== adminPassword) {
      return { success: false, message: 'Password saat ini salah.' }
    }
    setAdminPasswordState(newPassword)
    storage.set('animastudio_admin_password', newPassword)
    return { success: true, message: 'Password berhasil diubah!' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    storage.remove(KEYS.AUTH)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword, adminPassword, authError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
