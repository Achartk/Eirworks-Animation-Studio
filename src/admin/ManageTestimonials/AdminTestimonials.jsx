import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MessageSquare, Plus, Trash2, Edit, Star, Save, X, Smile, CheckCircle2 } from 'lucide-react'
import './AdminTestimonials.css'

const emptyForm = {
  name: '',
  role: '',
  text: '',
  rating: 5,
  avatar: '👤',
}

function TestimonialForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim()) {
      alert('Nama dan isi ulasan wajib diisi.')
      return
    }
    onSave(form)
  }

  return (
    <form className="testimonial-form" onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label className="admin-label" htmlFor="tf-name">Nama Klien / Partner *</label>
        <input
          id="tf-name"
          className="admin-input"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="Contoh: Klien Anonim / Partner Bisnis"
          required
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-label" htmlFor="tf-role">Pekerjaan / Peran</label>
        <input
          id="tf-role"
          className="admin-input"
          value={form.role}
          onChange={e => set('role', e.target.value)}
          placeholder="Contoh: Pemilik Bisnis / Produser Kreatif"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-label" htmlFor="tf-rating">Rating (Bintang)</label>
        <div className="rating-select" style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              type="button"
              key={val}
              className={`rating-star-btn ${form.rating >= val ? 'active' : ''}`}
              onClick={() => set('rating', val)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <Star
                size={22}
                fill={form.rating >= val ? '#f59e0b' : 'none'}
                color={form.rating >= val ? '#f59e0b' : '#64748b'}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-label" htmlFor="tf-text">Isi Ulasan / Testimonial *</label>
        <textarea
          id="tf-text"
          className="admin-textarea"
          value={form.text}
          onChange={e => set('text', e.target.value)}
          placeholder="Tulis ulasan klien di sini..."
          rows={5}
          required
        />
      </div>

      <div className="form-actions" style={{ marginTop: '1.5rem' }}>
        <button type="button" className="admin-btn admin-btn--secondary" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="admin-btn admin-btn--primary">
          <Save size={16} /> Simpan Testimonial
        </button>
      </div>
    </form>
  )
}

function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useApp()
  const [view, setView] = useState('list') // 'list' | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = (data) => {
    if (view === 'add') {
      addTestimonial(data)
      showToast('Testimonial berhasil ditambahkan!')
    } else {
      updateTestimonial(editTarget.id, data)
      showToast('Testimonial berhasil diperbarui!')
    }
    setView('list')
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    deleteTestimonial(id)
    showToast('Testimonial berhasil dihapus!')
    setDeleteConfirm(null)
  }

  return (
    <div className="admin-testimonials">
      {toast && (
        <div className="admin-toast admin-toast--success" role="alert" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {toast}
        </div>
      )}

      {deleteConfirm && (
        <div className="confirm-modal" role="dialog" aria-modal="true" aria-label="Konfirmasi Hapus">
          <div className="confirm-modal__inner">
            <div className="confirm-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <Trash2 size={24} />
            </div>
            <h3>Hapus Testimonial?</h3>
            <p>Ulasan dari <strong>"{deleteConfirm.name}"</strong> akan dihapus secara permanen.</p>
            <div className="confirm-actions">
              <button className="admin-btn admin-btn--secondary" onClick={() => setDeleteConfirm(null)}>
                Batal
              </button>
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(deleteConfirm.id)}>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'list' ? (
        <>
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Kelola Testimonial</h1>
              <p className="admin-page-subtitle">{testimonials.length} testimonial total</p>
            </div>
            <button
              className="admin-btn admin-btn--primary"
              onClick={() => { setEditTarget(null); setView('add') }}
            >
              <Plus size={16} /> Tambah Testimonial
            </button>
          </div>

          <div className="admin-card testimonials-list-card">
            {testimonials.length === 0 ? (
              <div className="empty-state" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                <MessageSquare size={48} style={{ color: '#64748b', opacity: 0.6, marginBottom: '1rem' }} />
                <p>Belum ada testimonial. Klik tombol di atas untuk menambah.</p>
              </div>
            ) : (
              <div className="testimonials-grid-admin">
                {testimonials.map((t) => (
                  <div key={t.id} id={`t-card-${t.id}`} className="testimonial-edit-card">
                    <div className="t-card-header">
                      <div className="t-card-rating">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            fill={t.rating > idx ? '#f59e0b' : 'none'}
                            color={t.rating > idx ? '#f59e0b' : '#64748b'}
                          />
                        ))}
                      </div>
                      <div className="t-card-actions">
                        <button
                          className="action-icon-btn edit"
                          onClick={() => { setEditTarget(t); setView('edit') }}
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="action-icon-btn delete"
                          onClick={() => setDeleteConfirm(t)}
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="t-card-text">"{t.text}"</p>
                    <div className="t-card-author">
                      <div className="t-card-avatar">
                        <Smile size={16} style={{ color: 'var(--color-accent-2)' }} />
                      </div>
                      <div className="t-card-meta">
                        <strong className="t-card-name">{t.name}</strong>
                        <span className="t-card-role">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">
                {view === 'add' ? 'Tambah Testimonial Baru' : 'Edit Testimonial'}
              </h1>
              <p className="admin-page-subtitle">
                {view === 'add' ? 'Isi formulir ulasan klien baru' : `Mengedit ulasan: ${editTarget?.name}`}
              </p>
            </div>
            <button className="admin-btn admin-btn--secondary" onClick={() => { setView('list'); setEditTarget(null) }}>
              ← Kembali ke Daftar
            </button>
          </div>
          <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto 2rem 0' }}>
            <TestimonialForm
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

export default AdminTestimonials
