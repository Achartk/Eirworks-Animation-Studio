import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { sendVerificationCode, generateOTP } from '../../services/emailService'
import './AdminLogin.css'

function AdminLogin() {
  const { login, authError } = useAuth()

  // Steps: 'request_email' -> 'verify_otp' -> 'enter_password' | 'lockout'
  const [step, setStep] = useState('request_email')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Hardcoded Admin Email
  const ADMIN_EMAIL = 'eirworkanimation@gmail.com'

  // States
  const [password, setPassword] = useState('')
  const [sentOtp, setSentOtp] = useState('')
  const [inputOtp, setInputOtp] = useState('')
  const [failedAttempts, setFailedAttempts] = useState(0)

  // Timers
  const [expiresAt, setExpiresAt] = useState(null)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)

  // Efek untuk mengurus Countdown Timer (Kadaluwarsa 15 menit & Cooldown 60 detik)
  useEffect(() => {
    let interval;
    if (step === 'verify_otp') {
      interval = setInterval(() => {
        // Cooldown Kirim Ulang
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0))

        // Sisa Waktu 15 Menit
        if (expiresAt) {
          const remaining = Math.floor((expiresAt - Date.now()) / 1000)
          if (remaining <= 0) {
            setStep('lockout')
            setErrorMsg('Waktu 15 menit telah habis. Kode kadaluwarsa.')
            setTimeLeft(0)
          } else {
            setTimeLeft(remaining)
          }
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, expiresAt])

  // 1. Minta Kode (Kirim ke Email Admin)
  const handleSendCode = async (e, isResend = false) => {
    if (e) e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      // Kode berubah/baru setiap kali fungsi ini dipanggil
      const code = generateOTP()
      setSentOtp(code)

      const res = await sendVerificationCode(ADMIN_EMAIL, code)
      if (res.success) {
        if (!isResend) setStep('verify_otp')
        setFailedAttempts(0)
        setInputOtp('')

        // Set waktu kedaluwarsa 15 menit dari sekarang
        setExpiresAt(Date.now() + 15 * 60 * 1000)
        // Set larangan kirim ulang selama 60 detik
        setResendCooldown(60)
      } else {
        setErrorMsg(res.message || 'Gagal mengirim kode ke email.')
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi API.')
    } finally {
      setLoading(false)
    }
  }

  // 2. Verifikasi Kode
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (inputOtp === sentOtp) {
      setStep('enter_password')
    } else {
      const newFails = failedAttempts + 1
      setFailedAttempts(newFails)
      if (newFails >= 3) {
        setStep('lockout')
      } else {
        setErrorMsg(`Kode salah. Sisa percobaan: ${3 - newFails}`)
      }
    }
  }

  // 3. Login dengan Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    login(password)
    setLoading(false)
  }

  // 4. Buka Kunci (Reset API)
  const handleResetLockout = (e) => {
    if (e) e.preventDefault()
    setStep('request_email')
    setSentOtp('')
    setInputOtp('')
    setFailedAttempts(0)
    setErrorMsg('')
    setExpiresAt(null)
  }

  // Format MM:SS untuk sisa waktu
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
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

        {/* =========================================
            STEP 1: REQUEST EMAIL CODE 
            ========================================= */}
        {step === 'request_email' && (
          <>
            <div className="login-header">
              <div className="login-badge"><span>🛡️</span> Verifikasi 2 Langkah</div>
              <h1 className="login-title">Akses Admin</h1>
              <p className="login-subtitle">
                Halaman ini dilindungi. Klik tombol di bawah untuk mengirimkan kode OTP ke email administrator (<strong style={{ color: '#38bdf8' }}>{ADMIN_EMAIL}</strong>).
              </p>
            </div>
            <form onSubmit={handleSendCode} className="login-form">
              {errorMsg && <p className="form-error" style={{ marginBottom: '1rem' }}>{errorMsg}</p>}
              <button type="submit" className={`login-btn ${loading ? 'login-btn--loading' : ''}`} disabled={loading}>
                {loading ? 'Mengirim API...' : 'Kirim Kode ke Email Admin'}
              </button>
            </form>
          </>
        )}

        {/* =========================================
            STEP 2: VERIFY OTP 
            ========================================= */}
        {step === 'verify_otp' && (
          <>
            <div className="login-header">
              <div className="login-badge"><span>✉️</span> Cek Email Anda</div>
              <h1 className="login-title">Masukkan Kode</h1>
              <p className="login-subtitle">Kami telah mengirimkan 6-digit kode API ke <strong>{ADMIN_EMAIL}</strong>.</p>
            </div>
            <form onSubmit={handleVerifyOtp} className="login-form">
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Kode Verifikasi (OTP)</label>
                  <span style={{ fontSize: '0.85rem', color: timeLeft <= 60 ? '#f87171' : '#94a3b8' }}>
                    Berlaku: {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="input-wrap">
                  <input
                    type="text"
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="form-input text-center"
                    style={{ letterSpacing: '0.5em', fontSize: '1.2rem', fontWeight: 'bold' }}
                    required
                    autoFocus
                  />
                </div>
                {errorMsg && <p className="form-error">{errorMsg}</p>}
              </div>
              <button type="submit" className="login-btn" disabled={inputOtp.length < 6}>
                Verifikasi Kode
              </button>

              {/* Tombol Kirim Ulang */}
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Tidak menerima kode?</p>
                <button
                  type="button"
                  onClick={(e) => handleSendCode(e, true)}
                  disabled={resendCooldown > 0 || loading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: resendCooldown > 0 ? '#64748b' : '#38bdf8',
                    cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                    textDecoration: resendCooldown > 0 ? 'none' : 'underline',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                >
                  {resendCooldown > 0 ? `Kirim ulang dalam ${resendCooldown}s` : (loading ? 'Mengirim...' : 'Kirim Ulang Kode')}
                </button>
              </div>
            </form>
          </>
        )}

        {/* =========================================
            STEP 3: ENTER PASSWORD 
            ========================================= */}
        {step === 'enter_password' && (
          <>
            <div className="login-header">
              <div className="login-badge"><span>✅</span> OTP Berhasil</div>
              <h1 className="login-title">Masuk ke Dashboard</h1>
              <p className="login-subtitle">Kode valid. Silakan masukkan password admin Anda.</p>
            </div>
            <form onSubmit={handlePasswordSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Password Admin</label>
                <div className="input-wrap">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className={`form-input ${authError ? 'form-input--error' : ''}`}
                    required
                    autoFocus
                  />
                </div>
                {authError && <p className="form-error">{authError}</p>}
              </div>
              <button type="submit" className={`login-btn ${loading ? 'login-btn--loading' : ''}`} disabled={loading || !password}>
                {loading ? 'Memverifikasi...' : 'Masuk Dashboard Admin'}
              </button>
            </form>
            <div className="login-hint" style={{ marginTop: '1rem' }}>
              <span>Demo password: <code>animastudio2024</code></span>
            </div>
          </>
        )}

        {/* =========================================
            STEP 4: LOCKOUT 
            ========================================= */}
        {step === 'lockout' && (
          <div className="lockout-screen" style={{ textAlign: 'center' }}>
            <div className="login-header">
              <div className="login-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', margin: '0 auto 1rem' }}>
                <span>❌</span> Akses Diblokir
              </div>
              <h1 className="login-title" style={{ color: '#f87171' }}>Akses Terkunci</h1>
              <p className="login-subtitle">
                {errorMsg.includes('habis')
                  ? 'Waktu 15 menit telah habis. Kode keamanan Anda sudah kedaluwarsa.'
                  : 'Anda telah salah memasukkan kode sebanyak 3 kali. Demi keamanan, Anda harus melakukan verifikasi ulang.'}
              </p>
            </div>

            <a href="#" onClick={handleResetLockout} className="login-btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
              Minta Kode Baru API
            </a>
          </div>
        )}

        {step !== 'lockout' && (
          <a href="/" className="login-back" style={{ marginTop: '2rem' }}>
            ← Kembali ke Beranda
          </a>
        )}
      </div>
    </div>
  )
}

export default AdminLogin

