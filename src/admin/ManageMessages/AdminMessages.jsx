import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Mail, Search, Trash2, CheckCircle2, ChevronRight, X, Clock, Calendar, ExternalLink } from 'lucide-react'
import './AdminMessages.css'

function AdminMessages() {
  const { clientMessages, deleteClientMessage, markMessageAsRead } = useApp()
  const [filter, setFilter] = useState('all') // 'all' | 'unread' | 'read'
  const [search, setSearch] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg)
    if (!msg.read) {
      markMessageAsRead(msg.id)
    }
  }

  const handleDelete = (id) => {
    deleteClientMessage(id)
    showToast('Pesan berhasil dihapus!')
    setDeleteConfirm(null)
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null)
    }
  }

  // Format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return '-'
    const date = new Date(isoString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filter & Search messages
  const filteredMessages = clientMessages.filter(msg => {
    // 1. Filter by read status
    if (filter === 'unread' && msg.read) return false
    if (filter === 'read' && !msg.read) return false

    // 2. Filter by search query
    if (search.trim() !== '') {
      const q = search.toLowerCase()
      const nameMatch = msg.name?.toLowerCase().includes(q)
      const emailMatch = msg.email?.toLowerCase().includes(q)
      const messageMatch = msg.message?.toLowerCase().includes(q)
      const serviceMatch = msg.service?.toLowerCase().includes(q)
      return nameMatch || emailMatch || messageMatch || serviceMatch
    }

    return true
  })

  const unreadCount = clientMessages.filter(m => !m.read).length

  return (
    <div className="admin-messages">
      {toast && (
        <div className="admin-toast admin-toast--success" role="alert" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {toast}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="confirm-modal" role="dialog" aria-modal="true" aria-label="Konfirmasi Hapus Pesan">
          <div className="confirm-modal__inner">
            <div className="confirm-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <Trash2 size={24} />
            </div>
            <h3>Hapus Pesan Klien?</h3>
            <p>Pesan dari <strong>"{deleteConfirm.name}"</strong> akan dihapus secara permanen dari basis data.</p>
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

      {/* Detailed Message Modal */}
      {selectedMessage && (
        <div className="confirm-modal message-detail-modal" role="dialog" aria-modal="true" aria-label="Detail Pesan">
          <div className="confirm-modal__inner message-detail-modal__inner">
            <div className="detail-modal-header">
              <div className="sender-avatar-large">
                {selectedMessage.name ? selectedMessage.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="sender-meta-large">
                <h3>{selectedMessage.name}</h3>
                <span className="sender-email">{selectedMessage.email}</span>
              </div>
              <button className="detail-modal-close" onClick={() => setSelectedMessage(null)} aria-label="Tutup">
                <X size={20} />
              </button>
            </div>

            <div className="detail-modal-body">
              <div className="detail-meta-grid">
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Layanan Diminati</span>
                  <span className="detail-meta-value badge-tag badge-service">{selectedMessage.service}</span>
                </div>
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Estimasi Budget</span>
                  <span className="detail-meta-value badge-tag badge-budget">{selectedMessage.budget}</span>
                </div>
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Tanggal Masuk</span>
                  <span className="detail-meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {formatDate(selectedMessage.timestamp)}
                  </span>
                </div>
              </div>

              <div className="detail-message-content">
                <h4 className="detail-message-title">Pesan Client:</h4>
                <div className="message-text-bubble">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="detail-modal-footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setDeleteConfirm(selectedMessage)}>
                <Trash2 size={16} /> Hapus Pesan
              </button>
              <a 
                href={`mailto:${selectedMessage.email}?subject=Tanggapan Eirworks Animation Studio untuk konsultasi proyek`} 
                className="admin-btn admin-btn--primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Mail size={16} /> Hubungi via Email <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pesan Klien</h1>
          <p className="admin-page-subtitle">
            {clientMessages.length} pesan total • {unreadCount} belum dibaca
          </p>
        </div>
      </div>

      <div className="admin-card messages-inbox-card">
        {/* Controls Section */}
        <div className="inbox-controls">
          <div className="inbox-filters">
            <button 
              className={`inbox-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Semua ({clientMessages.length})
            </button>
            <button 
              className={`inbox-filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Belum Dibaca ({unreadCount})
            </button>
            <button 
              className={`inbox-filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Terbaca ({clientMessages.length - unreadCount})
            </button>
          </div>

          <div className="inbox-search">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Cari nama, email, pesan..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Message List */}
        {filteredMessages.length === 0 ? (
          <div className="empty-state" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <Mail size={48} style={{ color: 'var(--color-text-muted)', opacity: 0.5, marginBottom: '1rem' }} />
            <p>Tidak ada pesan yang sesuai dengan filter/pencarian Anda.</p>
          </div>
        ) : (
          <div className="messages-list-wrapper">
            <div className="messages-header-row">
              <div className="col-status">Status</div>
              <div className="col-sender">Pengirim</div>
              <div className="col-service font-display">Layanan</div>
              <div className="col-budget font-display">Budget</div>
              <div className="col-snippet">Pesan</div>
              <div className="col-date">Tanggal</div>
              <div className="col-actions">Aksi</div>
            </div>

            <div className="messages-rows">
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message-row ${!msg.read ? 'message-row--unread' : ''}`}
                  onClick={() => handleOpenMessage(msg)}
                  id={`msg-row-${msg.id}`}
                >
                  <div className="col-status" onClick={e => e.stopPropagation()}>
                    <span className={`status-dot ${!msg.read ? 'status-dot--active' : ''}`} title={!msg.read ? 'Belum dibaca' : 'Terbaca'}></span>
                  </div>
                  <div className="col-sender">
                    <strong className="sender-name">{msg.name}</strong>
                    <span className="sender-email">{msg.email}</span>
                  </div>
                  <div className="col-service">
                    <span className="badge-tag badge-service">{msg.service}</span>
                  </div>
                  <div className="col-budget">
                    <span className="badge-tag badge-budget">{msg.budget}</span>
                  </div>
                  <div className="col-snippet">
                    <p className="message-snippet-text">{msg.message}</p>
                  </div>
                  <div className="col-date">
                    <span className="date-text">{formatDate(msg.timestamp)}</span>
                  </div>
                  <div className="col-actions" onClick={e => e.stopPropagation()}>
                    <button 
                      className="action-icon-btn edit" 
                      onClick={() => handleOpenMessage(msg)}
                      title="Buka Pesan"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button 
                      className="action-icon-btn delete" 
                      onClick={() => setDeleteConfirm(msg)}
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminMessages
