import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './Services.css'


const process = [
  { step: '01', title: 'Konsultasi', desc: 'Diskusi kebutuhan, tujuan, dan referensi proyek Anda secara mendalam.' },
  { step: '02', title: 'Brief & Proposal', desc: 'Penyusunan brief kreatif dan proposal teknis beserta timeline.' },
  { step: '03', title: 'Pre-production', desc: 'Pembuatan script, storyboard, dan desain visual awal.' },
  { step: '04', title: 'Produksi', desc: 'Animasi, rendering, dan integrasi audio secara penuh.' },
  { step: '05', title: 'Review', desc: 'Revisi berdasarkan feedback Anda hingga 3 kali tanpa biaya tambahan.' },
  { step: '06', title: 'Delivery', desc: 'Final file dalam berbagai format sesuai kebutuhan platform Anda.' },
]

function Services() {
  const { services: allServices, siteSettings } = useApp()
  // Only show active services on the public-facing page
  const services = allServices.filter(s => s.active !== false)
  const [activeService, setActiveService] = useState(null)

  const waLink = `https://wa.me/6285792669250`

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="page-hero services-hero" aria-labelledby="services-title">
        <div className="page-hero__bg" aria-hidden="true">
          <div className="orb orb--services-1"></div>
          <div className="orb orb--services-2"></div>
        </div>
        <div className="container page-hero__content">
          <div className="badge">✦ Layanan Kami</div>
          <h1 id="services-title" className="page-hero__title">
            Layanan <span className="text-gradient">Animasi Profesional</span>
          </h1>
          <p className="page-hero__subtitle">
            Dari konsep hingga delivery, kami menghadirkan solusi animasi lengkap
            yang disesuaikan dengan kebutuhan dan anggaran Anda.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section section-padding" aria-labelledby="services-list-title">
        <div className="container">
          <h2 id="services-list-title" className="sr-only">Daftar Layanan</h2>
          <div className="services-grid">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                id={`service-card-${svc.id}`}
                className={`service-card ${activeService === svc.id ? 'service-card--active' : ''}`}
                onClick={() => setActiveService(activeService === svc.id ? null : svc.id)}
                style={{ '--card-gradient': svc.gradient }}
              >
                <div className="service-card__header">
                  <div className="service-card__icon-wrap">
                    <span className="service-card__icon">{svc.icon}</span>
                  </div>
                  <div className="service-card__meta">
                    <span className="service-card__price">{svc.price}</span>
                    <span className="service-card__duration">⏱ {svc.duration}</span>
                  </div>
                </div>

                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__desc">{svc.shortDesc}</p>

                {/* Expandable Details */}
                <div className={`service-card__details ${activeService === svc.id ? 'service-card__details--open' : ''}`}>
                  <p className="service-card__full-desc">{svc.fullDesc}</p>
                  <ul className="service-features">
                    {svc.features.map((f) => (
                      <li key={f} className="service-feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="service-card__toggle"
                  aria-expanded={activeService === svc.id}
                  aria-label={`${activeService === svc.id ? 'Tutup' : 'Buka'} detail ${svc.title}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveService(activeService === svc.id ? null : svc.id)
                  }}
                >
                  {activeService === svc.id ? 'Tutup detail ↑' : 'Lihat detail ↓'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section section-padding" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header">
            <div className="badge">◈ Alur Kerja</div>
            <h2 id="process-title" className="section-title">
              Cara Kerja <span className="text-gradient">Kami</span>
            </h2>
            <p className="section-subtitle">
              Proses terstruktur dan transparan untuk memastikan proyek Anda berjalan lancar dari awal hingga selesai.
            </p>
          </div>

          <div className="process-steps">
            {process.map((p, i) => (
              <div key={p.step} id={`process-step-${p.step}`} className="process-step">
                <div className="process-step__number">{p.step}</div>
                <div className="process-step__content">
                  <h3 className="process-step__title">{p.title}</h3>
                  <p className="process-step__desc">{p.desc}</p>
                </div>
                {i < process.length - 1 && <div className="process-connector" aria-hidden="true"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="pricing-note section-padding" aria-labelledby="pricing-title">
        <div className="container">
          <div className="pricing-card">
            <div className="pricing-card__icon" aria-hidden="true">💬</div>
            <div className="pricing-card__content">
              <h2 id="pricing-title" className="pricing-card__title">
                Harga Disesuaikan dengan Kebutuhan Anda
              </h2>
              <p className="pricing-card__desc">
                Setiap proyek memiliki keunikan tersendiri. Hubungi kami untuk mendapatkan
                estimasi biaya yang akurat dan transparan, tanpa biaya tersembunyi.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                id="services-contact-whatsapp"
                className="btn-primary pricing-cta"
                style={{ backgroundColor: '#25D366', color: '#fff', border: 'none', gap: '0.5rem' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
