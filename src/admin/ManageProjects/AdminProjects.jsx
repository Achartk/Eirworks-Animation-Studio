import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { Palette, Globe, Zap, Film, Rocket, Leaf, Tent, Smartphone, Building, Gamepad2, Star, Sparkles, Target, Tv, Video, Clock, Trash2, FolderOpen, AlertTriangle, CheckCircle2 } from 'lucide-react'
import './AdminProjects.css'

const CATEGORIES = ['Animasi 2D', 'Animasi 3D', 'Motion Graphics', 'Explainer Video']
const ICONS = ['Palette', 'Globe', 'Zap', 'Film', 'Rocket', 'Leaf', 'Tent', 'Smartphone', 'Building', 'Gamepad2', 'Star', 'Sparkles', 'Target', 'Tv', 'Video']

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
const COLORS = [
  { color: '#7c3aed', accent: '#a855f7', label: 'Ungu' },
  { color: '#06b6d4', accent: '#38bdf8', label: 'Biru' },
  { color: '#10b981', accent: '#34d399', label: 'Hijau' },
  { color: '#f59e0b', accent: '#fbbf24', label: 'Kuning' },
  { color: '#ef4444', accent: '#f87171', label: 'Merah' },
  { color: '#8b5cf6', accent: '#a78bfa', label: 'Lavender' },
  { color: '#ec4899', accent: '#f472b6', label: 'Pink' },
  { color: '#14b8a6', accent: '#2dd4bf', label: 'Teal' },
]

const emptyForm = {
  title: '',
  client: '',
  category: 'Animasi 2D',
  year: String(new Date().getFullYear()),
  duration: '',
  desc: '',
  tags: '',
  emoji: '🎨',
  color: '#7c3aed',
  accent: '#a855f7',
  featured: false,
  image: null,
  imagePos: 50,
}

function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm)
  const [imagePreview, setImagePreview] = useState(initial?.image || null)
  const fileRef = useRef()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImagePreview(ev.target.result)
      set('image', ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title?.trim() || !form.client?.trim()) {
      alert("Mohon isi Judul Proyek dan Nama Klien.");
      return;
    }
    try {
      onSave({
        ...form,
        tags: (form.tags || '')
          .toString()
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
      })
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan: " + error.message);
      console.error(error);
    }
  }

  return (
    <form className="project-form" onSubmit={handleSubmit} id="project-form">
      <div className="project-form__grid">
        {/* LEFT */}
        <div className="form-col">
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="pf-title">Judul Proyek *</label>
            <input id="pf-title" className="admin-input" value={form.title}
              onChange={e => set('title', e.target.value)} placeholder="Contoh: BrandWave — Brand Identity" required />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="pf-client">Nama Klien *</label>
            <input id="pf-client" className="admin-input" value={form.client}
              onChange={e => set('client', e.target.value)} placeholder="Contoh: PT. Teknologi Maju" required />
          </div>
          <div className="form-row-2">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="pf-category">Kategori</label>
              <select id="pf-category" className="admin-select" value={form.category}
                onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="pf-year">Tahun</label>
              <input id="pf-year" className="admin-input" value={form.year}
                onChange={e => set('year', e.target.value)} placeholder="2024" maxLength={4} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="pf-duration">Durasi Pengerjaan</label>
            <input id="pf-duration" className="admin-input" value={form.duration}
              onChange={e => set('duration', e.target.value)} placeholder="Contoh: 21 hari" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="pf-tags">Tag (pisah dengan koma)</label>
            <input id="pf-tags" className="admin-input"
              value={typeof form.tags === 'string' ? form.tags : form.tags?.join(', ')}
              onChange={e => set('tags', e.target.value)}
              placeholder="After Effects, Logo Animation, Brand" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="pf-desc">Deskripsi Proyek</label>
            <textarea id="pf-desc" className="admin-textarea" value={form.desc}
              onChange={e => set('desc', e.target.value)}
              placeholder="Jelaskan secara singkat tentang proyek ini..." rows={4} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">
              <input type="checkbox" checked={form.featured}
                onChange={e => set('featured', e.target.checked)} style={{marginRight:6}} />
              Tampilkan sebagai Proyek Unggulan
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div className="form-col">
          {/* Image Upload */}
          <div className="admin-form-group">
            <label className="admin-label">Gambar Proyek</label>
            <div
              className={`image-upload-area ${imagePreview ? 'has-image' : ''}`}
              onClick={() => fileRef.current?.click()}
              role="button"
              tabIndex={0}
              id="pf-image-upload"
              aria-label="Upload gambar proyek"
              onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
            >
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" style={{ objectPosition: `center ${form.imagePos || 50}%` }} />
                  <div className="image-overlay">
                    <span>Ganti Gambar</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="3"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Klik untuk upload gambar</span>
                  <small>PNG, JPG, GIF • Maks 5MB</small>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*"
              onChange={handleImage} style={{display:'none'}} id="pf-file-input" />
            
            {imagePreview && (
              <div className="image-adjust-controls" style={{ marginTop: '12px', marginBottom: '8px' }}>
                <label className="admin-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Posisi Vertikal Gambar</span>
                  <span>{form.imagePos || 50}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={form.imagePos || 50} 
                  onChange={e => set('imagePos', parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
            )}

            {imagePreview && (
              <button type="button" className="admin-btn admin-btn--danger admin-btn--sm"
                style={{marginTop:6, width:'100%'}}
                onClick={() => { setImagePreview(null); set('image', null); set('imagePos', 50); }}>
                Hapus Gambar
              </button>
            )}
          </div>

          {/* Emoji */}
          <div className="admin-form-group">
            <label className="admin-label">Pilih Ikon Proyek</label>
            <div className="icon-picker" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {ICONS.map(iconName => {
                const IconComp = iconMap[iconName] || Palette
                return (
                  <button
                    type="button"
                    key={iconName}
                    id={`pf-icon-btn-${iconName}`}
                    className={`icon-picker-btn ${form.emoji === iconName ? 'active' : ''}`}
                    onClick={() => set('emoji', iconName)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: form.emoji === iconName ? '2px solid var(--color-accent-1)' : '1px solid var(--color-border-light)',
                      background: form.emoji === iconName ? 'rgba(124, 58, 237, 0.1)' : 'var(--color-bg-card)',
                      color: form.emoji === iconName ? 'var(--color-accent-1)' : 'var(--color-text-secondary)',
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

          {/* Color */}
          <div className="admin-form-group">
            <label className="admin-label">Warna Kartu</label>
            <div className="color-picker">
              {COLORS.map(c => (
                <button type="button" key={c.color}
                  id={`pf-color-${c.label.toLowerCase()}`}
                  className={`color-swatch ${form.color === c.color ? 'color-swatch--active' : ''}`}
                  style={{ background: c.color }}
                  title={c.label}
                  onClick={() => { set('color', c.color); set('accent', c.accent) }}
                >
                  {form.color === c.color && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview card */}
          <div className="admin-form-group">
            <label className="admin-label">Preview Kartu</label>
            <div className="project-preview-card" style={{'--pv-color': form.color, '--pv-accent': form.accent}}>
              <div className="pvc-visual">
                {imagePreview
                  ? <img src={imagePreview} alt="preview" className="pvc-img" style={{ objectPosition: `center ${form.imagePos || 50}%` }} />
                  : <span className="pvc-emoji" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {(() => {
                        const IconComponent = iconMap[form.emoji] || Film
                        return <IconComponent size={32} className="project-icon-svg" />
                      })()}
                    </span>
                }
              </div>
              <div className="pvc-info">
                <span className="pvc-cat">{form.category}</span>
                <p className="pvc-title">{form.title || 'Judul Proyek'}</p>
                <p className="pvc-client">{form.client || 'Nama Klien'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" id="pf-cancel" className="admin-btn admin-btn--secondary" onClick={onCancel}>Batal</button>
        <button type="submit" id="pf-submit" className="admin-btn admin-btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Simpan Proyek
        </button>
      </div>
    </form>
  )
}

function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = useApp()
  const [view, setView] = useState('list') // 'list' | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('Semua')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = (data) => {
    if (editTarget) {
      updateProject(editTarget.id, data)
      showToast('Proyek berhasil diperbarui!')
    } else {
      addProject(data)
      showToast('Proyek baru berhasil ditambahkan!')
    }
    setView('list')
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    deleteProject(id)
    setDeleteConfirm(null)
    showToast('Proyek berhasil dihapus.', 'danger')
  }

  const handleEdit = (proj) => {
    setEditTarget({ ...proj, tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags })
    setView('edit')
  }

  const filtered = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'Semua' || p.category === filterCat
    return matchSearch && matchCat
  })

  return (
    <div className="admin-projects">
      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} role="alert" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <Trash2 size={16} />} {toast.msg}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="confirm-modal" role="dialog" aria-modal="true" aria-label="Konfirmasi hapus">
          <div className="confirm-modal__inner">
            <div className="confirm-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={24} />
            </div>
            <h3>Hapus Proyek?</h3>
            <p>Proyek <strong>"{deleteConfirm.title}"</strong> akan dihapus permanen.</p>
            <div className="confirm-actions">
              <button id="confirm-cancel" className="admin-btn admin-btn--secondary"
                onClick={() => setDeleteConfirm(null)}>Batal</button>
              <button id="confirm-delete" className="admin-btn admin-btn--danger"
                onClick={() => handleDelete(deleteConfirm.id)}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {view === 'list' ? (
        <>
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Kelola Proyek</h1>
              <p className="admin-page-subtitle">{projects.length} proyek total</p>
            </div>
            <button id="add-project-btn" className="admin-btn admin-btn--primary"
              onClick={() => { setEditTarget(null); setView('add') }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Tambah Proyek
            </button>
          </div>

          {/* Filters */}
          <div className="project-filters">
            <div className="search-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input id="project-search" className="admin-input search-input"
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari judul atau klien..." />
            </div>
            <div className="cat-filters">
              {['Semua', ...CATEGORIES].map(c => (
                <button key={c} id={`filter-${c}`}
                  className={`admin-btn admin-btn--sm ${filterCat === c ? 'admin-btn--primary' : 'admin-btn--secondary'}`}
                  onClick={() => setFilterCat(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Table */}
          <div className="admin-card projects-table-card">
            {filtered.length === 0 ? (
              <div className="empty-state" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                <FolderOpen size={48} style={{ color: '#64748b', opacity: 0.6, marginBottom: '1rem' }} />
                <p>Tidak ada proyek ditemukan.</p>
                <button className="admin-btn admin-btn--primary admin-btn--sm"
                  onClick={() => setView('add')}>+ Tambah Proyek</button>
              </div>
            ) : (
              <div className="projects-table-wrap">
                <table className="projects-table" aria-label="Daftar proyek">
                  <thead>
                    <tr>
                      <th>Proyek</th>
                      <th>Kategori</th>
                      <th>Klien</th>
                      <th>Tahun</th>
                      <th>Unggulan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(proj => (
                      <tr key={proj.id} id={`proj-row-${proj.id}`}>
                        <td>
                          <div className="proj-cell">
                            <div className="proj-thumb" style={{'--pt-color': proj.color}}>
                              {proj.image
                                ? <img src={proj.image} alt={proj.title} />
                                : <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                    {(() => {
                                      const IconComponent = iconMap[proj.emoji] || Film
                                      return <IconComponent size={16} className="project-icon-svg" style={{ color: '#fff' }} />
                                    })()}
                                  </span>
                              }
                            </div>
                            <div>
                              <p className="proj-cell-title">{proj.title}</p>
                              <p className="proj-cell-sub">{proj.duration}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cat-badge">{proj.category}</span>
                        </td>
                        <td className="proj-client">{proj.client}</td>
                        <td className="proj-year">{proj.year}</td>
                        <td>
                          <span className={`featured-badge ${proj.featured ? 'featured-badge--yes' : 'featured-badge--no'}`}>
                            {proj.featured ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <Star size={11} fill="#f59e0b" color="#f59e0b" /> Unggulan
                              </span>
                            ) : '—'}
                          </span>
                        </td>
                        <td>
                          <div className="proj-actions">
                            <button id={`edit-${proj.id}`}
                              className="admin-btn admin-btn--secondary admin-btn--sm"
                              onClick={() => handleEdit(proj)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </button>
                            <button id={`delete-${proj.id}`}
                              className="admin-btn admin-btn--danger admin-btn--sm"
                              onClick={() => setDeleteConfirm(proj)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                              </svg>
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">
                {view === 'add' ? 'Tambah Proyek Baru' : 'Edit Proyek'}
              </h1>
              <p className="admin-page-subtitle">
                {view === 'add' ? 'Isi detail proyek baru Anda' : `Mengedit: ${editTarget?.title}`}
              </p>
            </div>
            <button id="back-to-list" className="admin-btn admin-btn--secondary"
              onClick={() => { setView('list'); setEditTarget(null) }}>
              ← Kembali ke Daftar
            </button>
          </div>
          <div className="admin-card">
            <ProjectForm
              initial={editTarget}
              onSave={handleSave}
              onCancel={() => { setView('list'); setEditTarget(null) }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminProjects
