import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { LayoutDashboard, LayoutGrid, Layers, MessageSquare, Settings, Mail } from 'lucide-react'
import './AdminLayout.css'

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="ms-auto" style={{ marginLeft: 'auto' }}>
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </svg>
)

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: 'projects',
    label: 'Kelola Proyek',
    icon: <LayoutGrid size={18} />,
  },
  {
    id: 'services',
    label: 'Kelola Layanan',
    icon: <Layers size={18} />,
  },
  {
    id: 'testimonials',
    label: 'Kelola Testimonial',
    icon: <MessageSquare size={18} />,
  },
  {
    id: 'messages',
    label: 'Pesan Klien',
    icon: <Mail size={18} />,
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    icon: <Settings size={18} />,
  },
]

function AdminLayout({ activePage, setActivePage, children }) {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.theme-dropdown-container')) {
        setThemeDropdownOpen(false)
      }
    }
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (window.innerWidth >= 1024 && !sidebarOpen) {
        // auto-open on desktop if was closed due to resize
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  return (
    <div className={`admin-layout ${sidebarOpen ? 'admin-layout--sidebar-open' : ''}`}>
      <div className="admin-grid-overlay" aria-hidden="true"></div>

      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="sidebar-header" style={{ padding: sidebarOpen ? '0 10px' : '0' }}>
          <div className="sidebar-brand" style={{ 
            width: sidebarOpen ? '150px' : '36px', 
            height: '36px',
            transition: 'width 0.3s ease',
            backgroundImage: 'url(/logo.svg)',
            backgroundSize: '150px auto',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            margin: '0 auto'
          }} title="Eirworks Animation Studio">
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Admin menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`admin-nav-${item.id}`}
              className={`sidebar-nav-item ${activePage === item.id ? 'sidebar-nav-item--active' : ''}`}
              onClick={() => setActivePage(item.id)}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-label">{item.label}</span>
              {activePage === item.id && <span className="nav-item-indicator" aria-hidden="true"></span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a
            href={window.location.origin + window.location.pathname}
            id="admin-view-site"
            className="sidebar-view-site"
            title="Kembali ke website publik"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Lihat Website</span>
          </a>
          <button
            id="admin-logout-btn"
            className="sidebar-logout"
            onClick={logout}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="topbar-mobile-toggle"
              id="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="topbar-breadcrumb">
              <span>Admin</span>
              <span>/</span>
              <span className="breadcrumb-current">
                {navItems.find(n => n.id === activePage)?.label || 'Dashboard'}
              </span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="theme-dropdown-container">
              <button
                className="theme-dropdown-btn"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              </button>
              {themeDropdownOpen && (
                <div className="theme-dropdown-menu">
                  <button
                    className={`theme-dropdown-item ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => { if (theme !== 'light') toggleTheme(); setThemeDropdownOpen(false); }}
                  >
                    <SunIcon /> Light
                    {theme === 'light' && <CheckIcon />}
                  </button>
                  <button
                    className={`theme-dropdown-item ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => { if (theme !== 'dark') toggleTheme(); setThemeDropdownOpen(false); }}
                  >
                    <MoonIcon /> Dark
                    {theme === 'dark' && <CheckIcon />}
                  </button>
                </div>
              )}
            </div>

            <div className="topbar-badge">
              <span className="online-dot" aria-hidden="true"></span>
              Online
            </div>
            <div className="topbar-admin">
              <div className="admin-avatar" aria-label="Admin user">A</div>
              <span className="admin-name">Administrator</span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>

      {/* Mobile overlay — only on mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
