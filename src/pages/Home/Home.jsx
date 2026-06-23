import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import './Home.css'

const stats = [
  { value: '150+', label: 'Proyek Selesai' },
  { value: '80+', label: 'Klien Puas' },
  { value: '5+', label: 'Tahun Pengalaman' },
  { value: '99%', label: 'Kepuasan Klien' },
]

const features = [
  {
    icon: '🎨',
    title: 'Animasi 2D',
    desc: 'Karakter dan storytelling yang hidup dengan gaya artistik yang khas dan penuh ekspresi.',
  },
  {
    icon: '🌐',
    title: 'Animasi 3D',
    desc: 'Visualisasi tiga dimensi realistis untuk produk, arsitektur, dan konten sinematik.',
  },
  {
    icon: '⚡',
    title: 'Motion Graphics',
    desc: 'Grafis bergerak dinamis untuk presentasi, iklan, dan konten media sosial.',
  },
  {
    icon: '🎬',
    title: 'Explainer Video',
    desc: 'Video penjelasan yang menarik untuk meningkatkan pemahaman dan konversi bisnis Anda.',
  },
]

const clients = [
  'TechVision', 'BrandCraft', 'PixelWave', 'NovaCorp', 'StartUp.io', 'MediaGroup'
]

function Home({ setActivePage }) {
  const heroRef = useRef(null)
  const { siteSettings } = useApp()

  const handleNav = (id) => {
    setActivePage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="home-page">
      {/* ======= HERO SECTION ======= */}
      <section className="hero" ref={heroRef} aria-label="Hero section">
        {/* Background orbs */}
        <div className="hero__bg">
          <div className="orb orb--1" aria-hidden="true"></div>
          <div className="orb orb--2" aria-hidden="true"></div>
          <div className="orb orb--3" aria-hidden="true"></div>
          <div className="grid-overlay" aria-hidden="true"></div>
        </div>

        <div className="container hero__content">
          <div className="hero__text">
            <div className="badge hero__badge animate-fade-up">
              <span>✦</span> Studio Animasi Profesional
            </div>

            <h1 className="hero__title">
              <span className="hero__title-line">Wujudkan Ide Anda</span>
              <br />
              <span className="text-gradient">Menjadi Animasi</span>
              <br />
              <span className="hero__title-line">Yang Memukau</span>
            </h1>

            <p className="hero__subtitle">
              {siteSettings.heroSubtitle || 'Kami adalah studio animasi 2D & 3D yang menghadirkan visual berkualitas sinematik untuk brand, produk, dan cerita Anda. Dari konsep hingga final delivery.'}
            </p>

            <div className="hero__actions">
              <button
                id="hero-cta-primary"
                className="btn-primary hero-btn-primary"
                onClick={() => handleNav('projects')}
              >
                Lihat Karya Kami
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                id="hero-cta-secondary"
                className="btn-outline"
                onClick={() => handleNav('services')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Jelajahi Layanan
              </button>
            </div>

            {/* Stats */}
            <div className="hero__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero__visual" aria-hidden="true">
            <div className="hero-card hero-card--main">
              <div className="hero-card__inner">
                <div className="anim-preview">
                  <img src="/logo.svg" alt="Animasi Studio" style={{ width: '70%', height: '70%', objectFit: 'contain', margin: 'auto', display: 'block', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-dot"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ======= FEATURES SECTION ======= */}
      <section className="features section-padding" aria-labelledby="features-title">
        <div className="container">
          <div className="section-header">
            <div className="badge">✦ Keunggulan Kami</div>
            <h2 id="features-title" className="section-title">
              Apa Yang Kami <span className="text-gradient">Tawarkan</span>
            </h2>
            <p className="section-subtitle">
              Layanan animasi profesional yang dirancang untuk membawa brand dan cerita Anda ke level berikutnya.
            </p>
          </div>

          <div className="features__grid">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                id={`feature-card-${i}`}
                className="feature-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="feature-card__icon">{feat.icon}</div>
                <h3 className="feature-card__title">{feat.title}</h3>
                <p className="feature-card__desc">{feat.desc}</p>
                <button
                  className="feature-card__link"
                  onClick={() => handleNav('services')}
                  aria-label={`Pelajari lebih lanjut tentang ${feat.title}`}
                >
                  Pelajari lebih →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA SECTION ======= */}
      <section className="cta-section section-padding" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-card">
            <div className="cta-orb cta-orb--1" aria-hidden="true"></div>
            <div className="cta-orb cta-orb--2" aria-hidden="true"></div>
            <div className="cta-content">
              <div className="badge">🚀 Mulai Sekarang</div>
              <h2 id="cta-title" className="cta-title">
                Siap Mewujudkan <span className="text-gradient">Visi Anda?</span>
              </h2>
              <p className="cta-subtitle">
                Konsultasikan proyek animasi Anda bersama tim kami secara gratis.
                Kami siap membantu dari nol hingga produk jadi.
              </p>
              <div className="cta-actions">
                <button
                  id="home-cta-contact"
                  className="btn-primary"
                  onClick={() => handleNav('services')}
                >
                  Konsultasi Gratis
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  id="home-cta-portfolio"
                  className="btn-outline"
                  onClick={() => handleNav('projects')}
                >
                  Lihat Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CLIENTS SECTION ======= */}
      <section className="clients-section" aria-labelledby="clients-title">
        <div className="container">
          <h2 id="clients-title" className="clients-title">Dipercaya Oleh</h2>
          <div className="clients-marquee">
            <div className="clients-track">
              {[...clients, ...clients].map((c, i) => (
                <div key={`${c}-${i}`} className="client-name">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
