import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Mail, MessageSquare, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import './Contact.css'

const contactInfo = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'eirworkanimation@gmail.com',
    href: 'mailto:eirworkanimation@gmail.com',
  },
  {
    Icon: MessageSquare,
    label: 'WhatsApp',
    value: '+62 857-9266-9250',
    href: 'https://wa.me/6285792669250',
  },
  {
    Icon: MapPin,
    label: 'Lokasi',
    value: 'Eirworks Studio (Google Maps)',
    href: 'https://maps.google.com/?q=Eirworks+Studio',
  },
  {
    Icon: Clock,
    label: 'Jam Kerja',
    value: 'Sen–Sab, 09.00–18.00 WIB',
    href: null,
  },
]

const serviceOptions = [
  'Animasi 2D',
  'Animasi 3D',
  'Motion Graphics',
  'Explainer Video',
  'Konsultasi Umum',
]

function Contact() {
  const { addClientMessage } = useApp()
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save message to database
    addClientMessage({
      name: form.name,
      email: form.email,
      service: form.service || '-',
      budget: form.budget || '-',
      message: form.message,
    })

    // Build WhatsApp message
    const text = encodeURIComponent(
      `Halo Eirworks! Saya ingin berkonsultasi.\n\n` +
      `*Nama:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Layanan:* ${form.service || '-'}\n` +
      `*Budget:* ${form.budget || '-'}\n\n` +
      `*Pesan:*\n${form.message}`
    )
    window.open(`https://wa.me/6285792669250?text=${text}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <section className="page-hero contact-hero" aria-labelledby="contact-title">
        <div className="page-hero__bg" aria-hidden="true">
          <div className="orb orb--services-1"></div>
          <div className="orb orb--services-2"></div>
        </div>
        <div className="container page-hero__content">
          <div className="badge"><Mail size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Hubungi Kami</div>
          <h1 id="contact-title" className="page-hero__title">
            Mari <span className="text-gradient">Berkolaborasi</span>
          </h1>
          <p className="page-hero__subtitle">
            Punya ide proyek animasi? Ceritakan kepada kami dan dapatkan konsultasi gratis dari tim Eirworks.
          </p>
        </div>
      </section>

      <section className="contact-section section-padding">
        <div className="container contact-grid">

          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="contact-info__title">Informasi Kontak</h2>
            <p className="contact-info__subtitle">
              Hubungi kami melalui saluran yang tersedia. Kami biasanya merespons dalam 1×24 jam.
            </p>

            <div className="contact-cards">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact-card">
                  <div className="contact-card__icon">
                    <item.Icon size={24} className="contact-icon-svg" />
                  </div>
                  <div className="contact-card__body">
                    <span className="contact-card__label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="contact-card__value contact-card__value--link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-card__value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social CTA */}
            <div className="contact-wa-cta">
              <p>Respon lebih cepat via WhatsApp</p>
              <a
                href="https://wa.me/6285792669250"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary contact-wa-btn"
                id="contact-whatsapp-direct"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <CheckCircle2 size={48} className="success-icon-svg" style={{ color: 'var(--color-accent-2)' }} />
                </div>
                <h3 className="contact-success__title">Pesan Terkirim!</h3>
                <p className="contact-success__text">
                  WhatsApp Anda akan terbuka dengan pesan yang sudah terisi. Kami akan segera membalas!
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', service: '', budget: '', message: '' })
                  }}
                >
                  Kirim Pesan Lagi
                </button>
              </div>
            ) : (
              <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="contact-form__title">Kirim Pesan</h2>
                <p className="contact-form__subtitle">Isi form ini dan pesan akan langsung diteruskan ke WhatsApp kami.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Nama Lengkap *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Nama Anda"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="email@domain.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">Layanan yang Diminati</label>
                    <select
                      id="contact-service"
                      name="service"
                      className="form-input form-select"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Pilih layanan...</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-budget">Estimasi Budget</label>
                    <select
                      id="contact-budget"
                      name="budget"
                      className="form-input form-select"
                      value={form.budget}
                      onChange={handleChange}
                    >
                      <option value="">Pilih range...</option>
                      <option value="< Rp 5 Juta">&lt; Rp 5 Juta</option>
                      <option value="Rp 5–15 Juta">Rp 5–15 Juta</option>
                      <option value="Rp 15–30 Juta">Rp 15–30 Juta</option>
                      <option value="> Rp 30 Juta">&gt; Rp 30 Juta</option>
                      <option value="Fleksibel">Fleksibel / Diskusi</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Ceritakan Proyek Anda *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Deskripsikan proyek Anda: tujuan, target audience, referensi, deadline, dll..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="btn-primary contact-submit-btn"
                  disabled={!form.name || !form.email || !form.message}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Kirim via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
