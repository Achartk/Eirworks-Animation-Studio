import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { resetAnalytics } from '../../utils/analytics'
import { getFirebaseConfig, saveFirebaseConfig } from '../../utils/firebase'
import { Globe, Mail, AlertTriangle, Info, Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react'
import './AdminSettings.css'

function AdminSettings() {
  const { siteSettings, setSiteSettings, migrateLocalToCloud, isSyncing } = useApp()
  const { changePassword, adminPassword } = useAuth()
  const [form, setForm] = useState(siteSettings)
  const [saved, setSaved] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)

  const [showDefaultPass, setShowDefaultPass] = useState(() => siteSettings.showPasswordInDashboard || false)

  // Password change state
  const [passForm, setPassForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passError, setPassError] = useState('')
  const [passSuccess, setPassSuccess] = useState('')

  // Firebase config state
  const [firebaseForm, setFirebaseForm] = useState(() => {
    const conf = getFirebaseConfig()
    return conf ? JSON.stringify(conf, null, 2) : ''
  })
  const [fbStatus, setFbStatus] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    setSiteSettings(form)
    setShowDefaultPass(form.showPasswordInDashboard || false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleResetAnalytics = () => {
    resetAnalytics()
    setResetConfirm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPassError('')
    setPassSuccess('')

    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError('Konfirmasi password baru tidak cocok.')
      return
    }
    if (passForm.newPassword.length < 6) {
      setPassError('Password baru harus minimal 6 karakter.')
      return
    }

    const res = changePassword(passForm.currentPassword, passForm.newPassword)
    if (res.success) {
      setPassSuccess(res.message)
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      setPassError(res.message)
    }
  }

  const handleFirebaseSave = (e) => {
    e.preventDefault()
    setFbStatus('')
    try {
      if (!firebaseForm.trim()) {
        saveFirebaseConfig(null)
        setFbStatus('Konfigurasi Firebase dihapus. Menggunakan penyimpanan lokal.')
        return
      }
      const configObj = JSON.parse(firebaseForm)
      if (!configObj.apiKey || !configObj.projectId) {
        throw new Error('Config harus memiliki apiKey dan projectId.')
      }
      saveFirebaseConfig(configObj)
      setFbStatus('Konfigurasi Firebase berhasil disimpan dan diaktifkan!')
    } catch (err) {
      setFbStatus('Error: Format JSON tidak valid atau field wajib (apiKey, projectId) tidak lengkap.')
    }
  }

  const handleMigration = async () => {
    if (!window.confirm('Apakah Anda yakin ingin memigrasikan semua data lokal ke Cloud Firestore? Data di cloud saat ini akan ditimpa.')) {
      return
    }
    setFbStatus('Sedang memigrasikan data ke Firebase Cloud...')
    const res = await migrateLocalToCloud()
    if (res.success) {
      setFbStatus(res.message)
    } else {
      setFbStatus('Gagal migrasi: ' + res.message)
    }
  }

  return (
    <div className="admin-settings">
      {saved && (
        <div className="admin-toast admin-toast--success" role="alert" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> Perubahan berhasil disimpan!
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pengaturan</h1>
          <p className="admin-page-subtitle">Konfigurasi informasi dan konten website</p>
        </div>
      </div>

      <form onSubmit={handleSave} id="settings-form" className="settings-layout">
        {/* Site Info */}
        <div className="admin-card settings-card">
          <div className="settings-card__header">
            <span className="settings-card__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} style={{ color: 'var(--color-accent-1)' }} />
            </span>
            <div>
              <h2 className="settings-card__title">Informasi Website</h2>
              <p className="settings-card__sub">Nama, tagline, dan identitas studio</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-sitename">Nama Studio</label>
              <input id="s-sitename" className="admin-input" value={form.siteName}
                onChange={e => set('siteName', e.target.value)} placeholder="AnimaStudio" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-tagline">Tagline</label>
              <input id="s-tagline" className="admin-input" value={form.tagline}
                onChange={e => set('tagline', e.target.value)}
                placeholder="Jasa Animasi 2D & 3D Profesional" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-hero-title">Judul Hero (Halaman Utama)</label>
              <textarea id="s-hero-title" className="admin-textarea" value={form.heroTitle}
                onChange={e => set('heroTitle', e.target.value)} rows={2} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-hero-sub">Subtitle Hero</label>
              <textarea id="s-hero-sub" className="admin-textarea" value={form.heroSubtitle}
                onChange={e => set('heroSubtitle', e.target.value)} rows={3} />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="admin-card settings-card">
          <div className="settings-card__header">
            <span className="settings-card__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} style={{ color: 'var(--color-accent-2)' }} />
            </span>
            <div>
              <h2 className="settings-card__title">Informasi Kontak</h2>
              <p className="settings-card__sub">Tampil di footer dan halaman kontak</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-email">Email</label>
              <input id="s-email" type="email" className="admin-input" value={form.email}
                onChange={e => set('email', e.target.value)} placeholder="hello@animastudio.id" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-phone">Nomor Telepon / WhatsApp</label>
              <input id="s-phone" className="admin-input" value={form.phone}
                onChange={e => set('phone', e.target.value)} placeholder="+62 857-9266-9250" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-location">Lokasi</label>
              <input id="s-location" className="admin-input" value={form.location}
                onChange={e => set('location', e.target.value)} placeholder="Denpasar, Bali" />
            </div>
            <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <input id="s-show-pass" type="checkbox" checked={form.showPasswordInDashboard || false}
                onChange={e => set('showPasswordInDashboard', e.target.checked)} style={{ cursor: 'pointer' }} />
              <label className="admin-label" htmlFor="s-show-pass" style={{ marginBottom: 0, cursor: 'pointer' }}>Tampilkan petunjuk (hint) password admin di halaman login (bisa dibuka-tutup oleh pengunjung)</label>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button type="submit" id="save-settings-btn" className="admin-btn admin-btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
            </svg>
            Simpan Semua Pengaturan
          </button>
        </div>
      </form>

      {/* Keamanan & Database Section */}
      <div className="settings-layout" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Ganti Password */}
        <div className="admin-card settings-card">
          <div className="settings-card__header">
            <span className="settings-card__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Save size={20} style={{ color: 'var(--color-accent-1)' }} />
            </span>
            <div>
              <h2 className="settings-card__title">Ganti Password Admin</h2>
              <p className="settings-card__sub">Ubah password untuk mengakses panel pengelolaan</p>
            </div>
          </div>
          <form onSubmit={handlePasswordChange} className="settings-fields" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            {passError && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{passError}</p>}
            {passSuccess && <p style={{ color: '#10b981', fontSize: '0.8rem', margin: 0 }}>{passSuccess}</p>}
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="pass-current">Password Saat Ini</label>
              <input id="pass-current" type="password" className="admin-input" value={passForm.currentPassword}
                onChange={e => setPassForm(f => ({ ...f, currentPassword: e.target.value }))} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="pass-new">Password Baru</label>
              <input id="pass-new" type="password" className="admin-input" value={passForm.newPassword}
                onChange={e => setPassForm(f => ({ ...f, newPassword: e.target.value }))} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="pass-confirm">Konfirmasi Password Baru</label>
              <input id="pass-confirm" type="password" className="admin-input" value={passForm.confirmPassword}
                onChange={e => setPassForm(f => ({ ...f, confirmPassword: e.target.value }))} required />
            </div>
            <button type="submit" id="change-password-btn" className="admin-btn admin-btn--primary admin-btn--sm" style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
              Perbarui Password
            </button>
          </form>
        </div>

        {/* Firebase integration */}
        <div className="admin-card settings-card">
          <div className="settings-card__header">
            <span className="settings-card__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} style={{ color: 'var(--color-accent-2)' }} />
            </span>
            <div>
              <h2 className="settings-card__title">Google Firebase Cloud Integration</h2>
              <p className="settings-card__sub">Hubungkan website dengan Cloud Firestore & Storage</p>
            </div>
          </div>
          <form onSubmit={handleFirebaseSave} className="settings-fields" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            {fbStatus && <p style={{ color: fbStatus.startsWith('Error') || fbStatus.startsWith('Gagal') ? '#ef4444' : '#10b981', fontSize: '0.8rem', margin: 0 }}>{fbStatus}</p>}
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-firebase-config">Paste Firebase Config JSON</label>
              <textarea
                id="s-firebase-config"
                className="admin-textarea"
                placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "...",\n  "projectId": "...",\n  "storageBucket": "...",\n  "messagingSenderId": "...",\n  "appId": "..."\n}`}
                value={firebaseForm}
                onChange={e => setFirebaseForm(e.target.value)}
                rows={8}
                style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
              />
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', display: 'block', marginTop: '4px' }}>
                Dapatkan config dari Firebase Console &gt; Project Settings &gt; Apps &gt; Web App &gt; Firebase SDK snippet configuration.
              </small>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button type="submit" id="save-firebase-btn" className="admin-btn admin-btn--primary admin-btn--sm">
                Simpan & Inisialisasi Firebase
              </button>
              {getFirebaseConfig() && (
                <button
                  type="button"
                  id="migrate-data-btn"
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                  onClick={handleMigration}
                  disabled={isSyncing}
                  style={{ border: '1px solid #10b981', color: '#10b981' }}
                >
                  {isSyncing ? 'Memigrasikan...' : 'Migrasikan Data ke Cloud'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="admin-card danger-zone" style={{ marginTop: '2rem' }}>
        <h2 className="danger-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={20} style={{ color: '#ef4444' }} /> Zona Berbahaya
        </h2>
        <div className="danger-item">
          <div>
            <p className="danger-item-title">Reset Data Analytics</p>
            <p className="danger-item-desc">Menghapus semua data traffic dan kunjungan. Tindakan ini tidak bisa dibatalkan.</p>
          </div>
          {resetConfirm ? (
            <div className="danger-confirm">
              <span className="danger-confirm-text">Yakin?</span>
              <button id="confirm-reset-yes" className="admin-btn admin-btn--danger admin-btn--sm"
                onClick={handleResetAnalytics}>Ya, Reset</button>
              <button id="confirm-reset-no" className="admin-btn admin-btn--secondary admin-btn--sm"
                onClick={() => setResetConfirm(false)}>Batal</button>
            </div>
          ) : (
            <button id="reset-analytics-btn" className="admin-btn admin-btn--danger admin-btn--sm"
              onClick={() => setResetConfirm(true)}>
              Reset Analytics
            </button>
          )}
        </div>
        <div className="danger-item">
          <div>
            <p className="danger-item-title">Reset Semua Data Proyek</p>
            <p className="danger-item-desc">Mengembalikan semua proyek ke data default bawaan aplikasi.</p>
          </div>
          <button id="reset-projects-btn" className="admin-btn admin-btn--danger admin-btn--sm"
            onClick={() => {
              if (window.confirm('Reset semua data proyek ke default?')) {
                localStorage.removeItem('animastudio_projects')
                window.location.reload()
              }
            }}>
            Reset Proyek
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="admin-card info-card">
        <h3 className="info-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} style={{ color: 'var(--color-accent-1)' }} /> Info Dashboard Admin
        </h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Akses Admin</span>
            <span className="info-value">Tambahkan <code>#admin</code> di URL</span>
          </div>
          <div className="info-item">
            <span className="info-label">Password Aktif</span>
            <span className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <code>{showDefaultPass ? adminPassword : '••••••••'}</code>
              <button 
                type="button" 
                onClick={() => setShowDefaultPass(!showDefaultPass)}
                className="admin-btn admin-btn--secondary admin-btn--sm"
                style={{ padding: '2px 8px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                {showDefaultPass ? <EyeOff size={12} /> : <Eye size={12} />}
                {showDefaultPass ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Data Storage</span>
            <span className="info-value">{getFirebaseConfig() ? 'Google Firebase Cloud' : 'localStorage browser'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Versi</span>
            <span className="info-value">1.1.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
