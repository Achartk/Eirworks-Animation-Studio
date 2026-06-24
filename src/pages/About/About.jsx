import { Target, Handshake, Lightbulb, Clock, Info, Gem, BookOpen } from 'lucide-react'
import './About.css'

const values = [
  {
    Icon: Target,
    title: 'Kualitas Tanpa Kompromi',
    desc: 'Setiap frame yang kami hasilkan melewati standar kualitas ketat untuk memastikan output terbaik.',
  },
  {
    Icon: Handshake,
    title: 'Kolaborasi Terbuka',
    desc: 'Kami percaya hasil terbaik lahir dari komunikasi yang jujur dan keterlibatan klien di setiap tahap.',
  },
  {
    Icon: Lightbulb,
    title: 'Inovasi Kreatif',
    desc: 'Selalu mengikuti tren terkini dan teknik animasi terbaru untuk menghadirkan karya yang relevan.',
  },
  {
    Icon: Clock,
    title: 'Tepat Waktu',
    desc: 'Komitmen penuh terhadap deadline tanpa mengorbankan kualitas adalah janji kami kepada klien.',
  },
]

const milestones = [
  { year: '2019', event: 'Eirworks Animation Studio didirikan di Denpasar' },
  { year: '2020', event: 'Menyelesaikan 30+ proyek animasi komersial perdana' },
  { year: '2021', event: 'Tim berkembang menjadi 8 orang kreator profesional' },
  { year: '2022', event: 'Bermitra dengan brand nasional dan startup teknologi' },
  { year: '2023', event: 'Ekspansi layanan 3D dan VFX cinematic' },
  { year: '2024', event: 'Meraih 150+ proyek dan 80+ klien yang puas' },
]

function About() {
  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero about-hero" aria-labelledby="about-title">
        <div className="page-hero__bg">
          <div className="orb orb--services-1"></div>
          <div className="orb orb--services-2"></div>
        </div>
        <div className="container page-hero__content">
          <div className="badge"><Info size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Tentang Kami</div>
          <h1 id="about-title" className="page-hero__title">
            Studio Animasi yang <span className="text-gradient">Lahir dari Passion</span>
          </h1>
          <p className="page-hero__subtitle">
            Eirworks Animation Studio bukan sekadar studio — kami adalah tim seniman dan kreator
            yang bersemangat membawa cerita Anda menjadi nyata melalui animasi.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section-padding" aria-labelledby="story-title">
        <div className="container story-grid">
          <div className="story-text">
            <div className="badge"><BookOpen size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Kisah Kami</div>
            <h2 id="story-title" className="story-title">
              Dari Mimpi Kecil Menjadi <span className="text-gradient">Studio Besar</span>
            </h2>
            <p>
              Eirworks Animation Studio lahir pada 2019 dari sebuah kamar kecil di Denpasar, dengan modal
              semangat dan laptop tua. Pendiri kami, Rizky Pratama, percaya bahwa animasi
              berkualitas tinggi seharusnya bisa diakses oleh bisnis lokal Indonesia.
            </p>
            <p>
              Dengan tekad itu, kami membangun tim yang solid — terdiri dari animator,
              desainer, dan kreator berpengalaman — yang berbagi visi yang sama: menghadirkan
              karya visual yang tidak hanya indah, tetapi juga bermakna.
            </p>
          </div>

          {/* Timeline */}
          <div className="timeline" aria-label="Perjalanan perusahaan">
            {milestones.map((m, i) => (
              <div key={m.year} id={`milestone-${m.year}`} className="timeline-item">
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot" aria-hidden="true"></div>
                <div className="timeline-event">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section section-padding" aria-labelledby="values-title">
        <div className="container">
          <div className="section-header">
            <div className="badge"><Gem size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Nilai Kami</div>
            <h2 id="values-title" className="section-title">
              Prinsip yang <span className="text-gradient">Memandu Kami</span>
            </h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} id={`value-card-${i}`} className="value-card">
                <div className="value-card__icon">
                  <v.Icon size={32} className="value-icon-svg" />
                </div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
