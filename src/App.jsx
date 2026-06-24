import { useState, useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { trackVisit } from './utils/analytics'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Contact from './pages/Contact/Contact'
import AdminApp from './admin/AdminApp'
import './styles/App.css'

function PublicSite() {
  const { siteSettings } = useApp()
  const [activePage, setActivePage] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  const waLink = `https://wa.me/6285792669250`

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  // Track every page change
  useEffect(() => {
    trackVisit(activePage)
  }, [activePage])

  const handleNav = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':     return <Home setActivePage={handleNav} />
      case 'services': return <Services />
      case 'about':    return <About />
      case 'projects': return <Projects />
      case 'contact':  return <Contact />
      default:         return <Home setActivePage={handleNav} />
    }
  }

  if (isLoading) {
    return (
      <div className="loader-screen">
        <div className="loader-content">
          <div className="loader-logo-text" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/logo.svg" alt="Eirworks Animation Studio" style={{ height: '280px', width: 'auto', objectFit: 'contain', animation: 'pulse 1.5s infinite ease-in-out' }} />
          </div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
          <p className="loader-text">Memuat pengalaman visual...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-wrapper">
      <Header activePage={activePage} setActivePage={handleNav} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer setActivePage={handleNav} />

      {/* Floating WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa"
        aria-label="Chat WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>
    </div>
  )
}

function App() {
  const [isAdmin, setIsAdmin] = useState(
    () => window.location.hash === '#admin'
  )

  // Listen for hash changes so /#admin navigates to admin panel
  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <AppProvider>
      <AuthProvider>
        {isAdmin ? <AdminApp /> : <PublicSite />}
      </AuthProvider>
    </AppProvider>
  )
}

export default App
