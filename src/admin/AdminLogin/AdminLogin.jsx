import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { Lock, Eye, EyeOff } from 'lucide-react'
import './AdminLogin.css'

function AdminLogin() {
  const { siteSettings } = useApp()
  const { login, authError, adminPassword } = useAuth()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showDemoPass, setShowDemoPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    login(password)
    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="login-bg" aria-hidden="true">
        <div className="login-orb login-orb--1"></div>
        <div className="login-orb login-orb--2"></div>
        <div className="login-grid"></div>
      </div>

      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.svg" alt="Eirworks Animation Studio" className="login-logo-img" />
        </div>

        <div className="login-header">
          <div className="login-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} style={{ color: 'var(--color-accent-2)' }} /> Panel Admin
          </div>
          <h1 className="login-title">Masuk Dashboard</h1>
          <p className="login-subtitle">
            Masukkan password admin untuk mengakses panel pengelolaan Eirworks Animation Studio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password Admin</label>
            <div className="input-wrap" style={{ position: 'relative' }}>
              <Lock className="input-icon" size={18} />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                className={`form-input ${authError ? 'form-input--error' : ''}`}
                required
                autoFocus
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  fontSize: '1.1rem',
                  padding: '4px',
                  lineHeight: 1,
                }}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {authError && <p className="form-error">{authError}</p>}
          </div>

          <button
            type="submit"
            className={`login-btn ${loading ? 'login-btn--loading' : ''}`}
            disabled={loading || !password}
          >
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard Admin'}
          </button>
        </form>

        {siteSettings?.showPasswordInDashboard && (
          <div className="login-hint" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔑</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Demo Pass:</span>
              <code style={{ letterSpacing: showDemoPass ? 'normal' : '0.15em', fontFamily: 'monospace' }}>
                {showDemoPass ? adminPassword : '••••••••'}
              </code>
            </div>
            <button
              type="button"
              onClick={() => setShowDemoPass(!showDemoPass)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                padding: 0,
                transition: 'color 0.2s'
              }}
              title={showDemoPass ? 'Sembunyikan' : 'Tampilkan'}
            >
              {showDemoPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        )}

        <a href="/" className="login-back" style={{ marginTop: '2rem' }}>
          ← Kembali ke Beranda
        </a>
      </div>
    </div>
  )
}

export default AdminLogin
