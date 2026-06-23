import { useApp } from '../../context/AppContext'
import './Footer.css'

const footerLinks = {
  layanan: [
    { label: 'Animasi 2D', id: 'services' },
    { label: 'Animasi 3D', id: 'services' },
    { label: 'Motion Graphics', id: 'services' },
    { label: 'Explainer Video', id: 'services' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', id: 'about' },
    { label: 'Proyek Kami', id: 'projects' },
    { label: 'Blog', id: 'home' },
    { label: 'Karir', id: 'home' },
  ],
}

const socials = [
  {
    name: 'Instagram', href: 'https://www.instagram.com/eir.works/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: 'YouTube', href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    )
  },
  {
    name: 'TikTok', href: 'https://www.tiktok.com/@eirworks',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5v6.5a4 4 0 1 1-4-4Z" />
      </svg>
    )
  },
]

function Footer({ setActivePage }) {
  const { siteSettings } = useApp()
  const handleNav = (id) => {
    setActivePage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      {/* Gradient divider */}
      <div className="footer-divider"></div>

      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="footer-logo" onClick={() => window.scrollTo(0,0)} style={{ cursor: 'pointer', flexShrink: 0 }}>
              <img src="/logo.svg" alt="Eirworks Animation Studio" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="footer__tagline" style={{ margin: 0 }}>
              Menghadirkan dunia visual yang memukau melalui animasi 2D & 3D berkualitas sinematik.
            </p>
          </div>
          <div className="footer__socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                id={`footer-social-${s.name.toLowerCase()}`}
                className="social-icon"
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="footer__links">
          <div className="footer__link-group">
            <h4 className="footer__link-title">Layanan</h4>
            {footerLinks.layanan.map((link) => (
              <button
                key={link.label}
                id={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className="footer__link"
                onClick={() => handleNav(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="footer__link-group">
            <h4 className="footer__link-title">Perusahaan</h4>
            {footerLinks.perusahaan.map((link) => (
              <button
                key={link.label}
                id={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className="footer__link"
                onClick={() => handleNav(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="footer__link-group">
            <h4 className="footer__link-title">Lainnya</h4>
            <a href="#admin" className="footer__link" id="footer-link-admin" style={{textDecoration: 'none'}}>
              Admin Panel
            </a>
          </div>
          <div className="footer__link-group">
            <h4 className="footer__link-title">Hubungi Kami</h4>
            <a href={`mailto:${siteSettings.email || 'hello@animastudio.id'}`} id="footer-email" className="footer__contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {siteSettings.email || 'hello@animastudio.id'}
            </a>
            <a href={`tel:${(siteSettings.phone || '+628123456789').replace(/[^+\d]/g, '')}`} id="footer-phone" className="footer__contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.81a2 2 0 0 1-.45 2.11L7.91 8.7A16 16 0 0 0 15.29 16l1.08-.88a2 2 0 0 1 2.11-.45c.9.3 1.85.51 2.81.65A2 2 0 0 1 22 16.92z" />
              </svg>
              {siteSettings.phone || '+62 812-3456-789'}
            </a>
            <p className="footer__contact-item footer__location">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {siteSettings.location || 'Jakarta, Indonesia'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Eirworks Animation Studio. Semua hak dilindungi.</p>
          <div className="footer__bottom-links">
            <button className="footer__bottom-link" id="footer-privacy">Kebijakan Privasi</button>
            <span>·</span>
            <button className="footer__bottom-link" id="footer-terms">Syarat & Ketentuan</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
