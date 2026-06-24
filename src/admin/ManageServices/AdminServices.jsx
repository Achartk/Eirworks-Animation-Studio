import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Palette, Globe, Zap, Film, Rocket, Leaf, Tent, Smartphone, Building, Gamepad2, Star, Sparkles, Target, Tv, Video, CheckCircle2 } from 'lucide-react'
import './AdminServices.css'

const iconMap = {
  // Compatibility with old emoji data
  '🎨': Palette,
  '🌐': Globe,
  '⚡': Zap,
  '🎬': Film,
  '🚀': Rocket,
  '🌿': Leaf,
  '🎪': Tent,
  '📱': Smartphone,
  '🏗️': Building,
  '🎭': Film,
  '🎮': Gamepad2,
  '🌟': Star,
  '💫': Sparkles,
  '🎯': Target,
  '🔮': Sparkles,
  // Lucide Names
  'Palette': Palette,
  'Globe': Globe,
  'Zap': Zap,
  'Film': Film,
  'Rocket': Rocket,
  'Leaf': Leaf,
  'Tent': Tent,
  'Smartphone': Smartphone,
  'Building': Building,
  'Gamepad2': Gamepad2,
  'Star': Star,
  'Sparkles': Sparkles,
  'Target': Target,
  'Tv': Tv,
  'Video': Video,
}

function AdminServices() {
  const { services, updateService } = useApp()
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const startEdit = (svc) => {
    setEditId(svc.id)
    setEditData({
      ...svc,
      features: Array.isArray(svc.features) ? svc.features.join('\n') : svc.features,
    })
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditData({})
  }

  const saveEdit = () => {
    updateService(editId, {
      ...editData,
      features: editData.features
        .split('\n')
        .map(f => f.trim())
        .filter(Boolean),
    })
    showToast('Layanan berhasil diperbarui!')
    cancelEdit()
  }

  const set = (k, v) => setEditData(d => ({ ...d, [k]: v }))

  const gradients = [
    { label: 'Ungu', value: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
    { label: 'Biru', value: 'linear-gradient(135deg, #06b6d4, #0284c7)' },
    { label: 'Oranye', value: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
    { label: 'Hijau', value: 'linear-gradient(135deg, #10b981, #059669)' },
    { label: 'Pink', value: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
  ]

  return (
    <div className="admin-services">
      {toast && (
        <div className="admin-toast admin-toast--success" role="alert" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {toast}
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Kelola Layanan</h1>
          <p className="admin-page-subtitle">Edit informasi layanan yang tampil di website</p>
        </div>
      </div>

      <div className="services-list">
        {services.map(svc => (
          <div key={svc.id} id={`svc-card-${svc.id}`} className="service-edit-card">
            {editId === svc.id ? (
              /* ── EDIT MODE ── */
              <div className="service-edit-form">
                <div className="service-edit-form__header">
                  <span className="svc-icon-display" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {(() => {
                      const IconComponent = iconMap[editData.icon] || Palette
                      return <IconComponent size={20} className="svc-icon-svg" />
                    })()}
                  </span>
                  <h3 className="svc-edit-title">Mengedit: {svc.title}</h3>
                </div>

                <div className="svc-form-grid">
                  <div className="svc-form-col">
                    <div className="admin-form-group">
                      <label className="admin-label">Pilih Ikon Layanan</label>
                      <div className="icon-picker" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        {Object.keys(iconMap).filter(k => k.length > 2).map((iconName) => {
                          const IconComp = iconMap[iconName]
                          return (
                            <button
                              type="button"
                              key={iconName}
                              id={`svc-icon-btn-${iconName}`}
                              className={`icon-picker-btn ${editData.icon === iconName ? 'active' : ''}`}
                              onClick={() => set('icon', iconName)}
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: editData.icon === iconName ? '2px solid var(--color-accent-1)' : '1px solid var(--color-border-light)',
                                background: editData.icon === iconName ? 'rgba(124, 58, 237, 0.1)' : 'var(--color-bg-card)',
                                color: editData.icon === iconName ? 'var(--color-accent-1)' : 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                              }}
                              title={iconName}
                            >
                              <IconComp size={16} />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor={`svc-title-${svc.id}`}>Judul Layanan</label>
                      <input id={`svc-title-${svc.id}`} className="admin-input" value={editData.title}
                        onChange={e => set('title', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor={`svc-short-${svc.id}`}>Deskripsi Singkat</label>
                      <input id={`svc-short-${svc.id}`} className="admin-input" value={editData.shortDesc}
                        onChange={e => set('shortDesc', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor={`svc-full-${svc.id}`}>Deskripsi Lengkap</label>
                      <textarea id={`svc-full-${svc.id}`} className="admin-textarea" value={editData.fullDesc}
                        onChange={e => set('fullDesc', e.target.value)} rows={4} />
                    </div>
                    <div className="form-row-2">
                      <div className="admin-form-group">
                        <label className="admin-label" htmlFor={`svc-price-${svc.id}`}>Harga</label>
                        <input id={`svc-price-${svc.id}`} className="admin-input" value={editData.price}
                          onChange={e => set('price', e.target.value)} placeholder="Mulai dari Rp ..." />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label" htmlFor={`svc-dur-${svc.id}`}>Durasi</label>
                        <input id={`svc-dur-${svc.id}`} className="admin-input" value={editData.duration}
                          onChange={e => set('duration', e.target.value)} placeholder="7–21 hari" />
                      </div>
                    </div>
                  </div>

                  <div className="svc-form-col">
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor={`svc-features-${svc.id}`}>
                        Fitur Layanan (satu per baris)
                      </label>
                      <textarea id={`svc-features-${svc.id}`} className="admin-textarea"
                        value={editData.features} onChange={e => set('features', e.target.value)}
                        rows={8} placeholder={"Fitur 1\nFitur 2\nFitur 3"} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Warna Kartu</label>
                      <div className="gradient-picker">
                        {gradients.map(g => (
                          <button type="button" key={g.label}
                            id={`svc-grad-${g.label.toLowerCase()}`}
                            className={`gradient-swatch ${editData.gradient === g.value ? 'gradient-swatch--active' : ''}`}
                            style={{ background: g.value }}
                            title={g.label}
                            onClick={() => set('gradient', g.value)}>
                            {editData.gradient === g.value && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">
                        <input type="checkbox" checked={editData.active !== false}
                          onChange={e => set('active', e.target.checked)}
                          style={{marginRight:6}} id={`svc-active-${svc.id}`} />
                        Layanan aktif (tampil di website)
                      </label>
                    </div>

                    {/* Preview */}
                    <div className="svc-preview" style={{'--sp-grad': editData.gradient}}>
                      <div className="svc-preview__bar"></div>
                      <div className="svc-preview__body">
                        <span className="svc-preview__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          {(() => {
                            const IconComponent = iconMap[editData.icon] || Palette
                            return <IconComponent size={20} className="svc-icon-svg" />
                          })()}
                        </span>
                        <div>
                          <p className="svc-preview__title">{editData.title}</p>
                          <p className="svc-preview__price">{editData.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button id={`svc-cancel-${svc.id}`} className="admin-btn admin-btn--secondary" onClick={cancelEdit}>Batal</button>
                  <button id={`svc-save-${svc.id}`} className="admin-btn admin-btn--primary" onClick={saveEdit}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            ) : (
              /* ── VIEW MODE ── */
              <div className="service-view">
                <div className="service-view__left">
                  <div className="svc-icon-box" style={{background: svc.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {(() => {
                      const IconComponent = iconMap[svc.icon] || Palette
                      return <IconComponent size={20} className="svc-icon-svg" style={{ color: '#fff' }} />
                    })()}
                  </div>
                  <div className="svc-info">
                    <div className="svc-info-top">
                      <h3 className="svc-view-title">{svc.title}</h3>
                      <span className={`svc-status ${svc.active !== false ? 'svc-status--on' : 'svc-status--off'}`}>
                        {svc.active !== false ? '● Aktif' : '○ Nonaktif'}
                      </span>
                    </div>
                    <p className="svc-view-desc">{svc.shortDesc}</p>
                    <div className="svc-view-meta">
                      <span className="svc-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        {svc.price}
                      </span>
                      <span className="svc-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {svc.duration}
                      </span>
                      <span className="svc-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                        {Array.isArray(svc.features) ? svc.features.length : 0} fitur
                      </span>
                    </div>
                  </div>
                </div>
                <button id={`edit-svc-${svc.id}`} className="admin-btn admin-btn--secondary admin-btn--sm"
                  onClick={() => startEdit(svc)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminServices
