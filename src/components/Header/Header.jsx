import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { Home, Layers, LayoutGrid, Info, Mail, Sun, Moon, Check, ArrowRight } from 'lucide-react'
import './Header.css'

const navItems = [
  { id: 'home',     label: 'Home',         Icon: Home },
  { id: 'services', label: 'Layanan',       Icon: Layers },
  { id: 'projects', label: 'Proyek',        Icon: LayoutGrid },
  { id: 'about',    label: 'Tentang Kami',  Icon: Info },
  { id: 'contact',  label: 'Kontak',        Icon: Mail },
]

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

  // Tutup mobile menu saat orientasi berubah
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
              <item.Icon size={13} strokeWidth={2} className="nav-icon-svg" />
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
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            {themeDropdownOpen && (
              <div className="theme-dropdown-menu">
                <button
                  className={`theme-dropdown-item ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => { if (theme !== 'light') toggleTheme(); setThemeDropdownOpen(false); }}
                >
                  <Sun size={15} /> Light
                  {theme === 'light' && <Check size={14} style={{ marginLeft: 'auto' }} />}
                </button>
                <button
                  className={`theme-dropdown-item ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => { if (theme !== 'dark') toggleTheme(); setThemeDropdownOpen(false); }}
                >
                  <Moon size={15} /> Dark
                  {theme === 'dark' && <Check size={14} style={{ marginLeft: 'auto' }} />}
                </button>
              </div>
            )}
          </div>
          <button
            id="nav-contact-btn"
            className="btn-primary header-cta-btn"
            onClick={() => handleNav('contact')}
          >
            Mulai Proyek
            <ArrowRight size={15} strokeWidth={2.5} />
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
              <item.Icon size={20} strokeWidth={1.8} className="mobile-nav-icon-svg" />
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
                <Sun size={16} /> Light
              </button>
              <button
                className={`mobile-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => { if (theme !== 'dark') toggleTheme() }}
              >
                <Moon size={16} /> Dark
              </button>
            </div>
          </div>
          <button
            id="mobile-nav-cta"
            className="btn-primary mobile-cta"
            onClick={() => handleNav('contact')}
          >
            Mulai Proyek →
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
