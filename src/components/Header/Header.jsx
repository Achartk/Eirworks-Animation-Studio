import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import './Header.css'

const navItems = [
  { id: 'home', label: 'Home', icon: '⊹' },
  { id: 'services', label: 'Layanan', icon: '✦' },
  { id: 'projects', label: 'Proyek', icon: '◈' },
  { id: 'about', label: 'Tentang Kami', icon: '◉' },
]

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

function Header({ activePage, setActivePage }) {
  const { theme, toggleTheme } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (id) => {
    setActivePage(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        {/* Logo */}
        <button
          className="header__logo"
          onClick={() => handleNav('home')}
          id="nav-logo"
          aria-label="Go to homepage"
        >
          <div className="header-logo">
            <img src="/logo.svg" alt="Eirworks Animation Studio" className="header-logo-img" />
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-link ${activePage === item.id ? 'nav-link--active' : ''}`}
              onClick={() => handleNav(item.id)}
              aria-current={activePage === item.id ? 'page' : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button & Theme Toggle */}
        <div className="header__cta">
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
          <button
            id="nav-contact-btn"
            className="btn-primary header-cta-btn"
            onClick={() => handleNav('services')}
          >
            Mulai Proyek
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="nav-mobile-toggle"
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              className={`mobile-nav-link ${activePage === item.id ? 'mobile-nav-link--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="mobile-theme-dropdown">
            <span className="mobile-theme-label">Tema</span>
            <div className="mobile-theme-options">
              <button
                className={`mobile-theme-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => { if (theme !== 'light') toggleTheme() }}
              >
                <SunIcon /> Light
              </button>
              <button
                className={`mobile-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => { if (theme !== 'dark') toggleTheme() }}
              >
                <MoonIcon /> Dark
              </button>
            </div>
          </div>
          <button
            id="mobile-nav-cta"
            className="btn-primary mobile-cta"
            onClick={() => handleNav('services')}
          >
            Mulai Proyek →
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
