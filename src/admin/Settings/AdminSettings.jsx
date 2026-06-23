import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { resetAnalytics } from '../../utils/analytics'
import './AdminSettings.css'

function AdminSettings() {
  const { siteSettings, setSiteSettings } = useApp()
  const [form, setForm] = useState(siteSettings)
  const [saved, setSaved] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    setSiteSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleResetAnalytics = () => {
    resetAnalytics()
    setResetConfirm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="admin-settings">
      {saved && (
        <div className="admin-toast admin-toast--success" role="alert">
          ✅ Perubahan berhasil disimpan!
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
            <span className="settings-card__icon">🌐</span>
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
            <span className="settings-card__icon">📬</span>
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
                onChange={e => set('phone', e.target.value)} placeholder="+62 812-3456-789" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="s-location">Lokasi</label>
              <input id="s-location" className="admin-input" value={form.location}
                onChange={e => set('location', e.target.value)} placeholder="Jakarta, Indonesia" />
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

      {/* Danger Zone */}
      <div className="admin-card danger-zone">
        <h2 className="danger-title">⚠️ Zona Berbahaya</h2>
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
        <h3 className="info-title">ℹ️ Info Dashboard Admin</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Akses Admin</span>
            <span className="info-value">Tambahkan <code>#admin</code> di URL</span>
          </div>
          <div className="info-item">
            <span className="info-label">Password Default</span>
            <span className="info-value"><code>animastudio2024</code></span>
          </div>
          <div className="info-item">
            <span className="info-label">Data Storage</span>
            <span className="info-value">localStorage browser</span>
          </div>
          <div className="info-item">
            <span className="info-label">Versi</span>
            <span className="info-value">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
