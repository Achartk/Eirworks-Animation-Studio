import { createContext, useContext, useState } from 'react'
import { storage, KEYS } from '../utils/storage'

const ADMIN_PASSWORD = 'animastudio2024'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    storage.get(KEYS.AUTH, false)
  )
  const [authError, setAuthError] = useState('')

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setAuthError('')
      storage.set(KEYS.AUTH, true)
      return true
    }
    setAuthError('Password salah. Coba lagi.')
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    storage.remove(KEYS.AUTH)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
