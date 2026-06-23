import './About.css'

const team = [
  {
    name: 'Rizky Pratama',
    role: 'Founder & Creative Director',
    bio: 'Pengalaman 8 tahun di industri animasi internasional. Alumni Ringling College of Art & Design.',
    emoji: '👨‍🎨',
    skills: ['2D Animation', 'Storyboarding', 'Art Direction'],
  },
  {
    name: 'Anisa Dewi',
    role: '3D Lead Artist',
    bio: 'Spesialis character & environment 3D. Pernah bekerja untuk studio animasi di Singapura dan Korea.',
    emoji: '👩‍💻',
    skills: ['Blender', 'Cinema 4D', 'Unreal Engine'],
  },
  {
    name: 'Dimas Fajar',
    role: 'Motion Graphics Designer',
    bio: 'Desainer motion grafis dengan keahlian di After Effects dan Lottie. Berpengalaman dalam video iklan.',
    emoji: '🎬',
    skills: ['After Effects', 'Motion Design', 'Lottie'],
  },
  {
    name: 'Sari Melati',
    role: 'Project Manager',
    bio: 'Memastikan setiap proyek berjalan tepat waktu dan sesuai ekspektasi klien dengan koordinasi yang solid.',
    emoji: '📋',
    skills: ['Project Management', 'Client Relations', 'Agile'],
  },
]

const values = [
  {
    icon: '🎯',
    title: 'Kualitas Tanpa Kompromi',
    desc: 'Setiap frame yang kami hasilkan melewati standar kualitas ketat untuk memastikan output terbaik.',
  },
  {
    icon: '🤝',
    title: 'Kolaborasi Terbuka',
    desc: 'Kami percaya hasil terbaik lahir dari komunikasi yang jujur dan keterlibatan klien di setiap tahap.',
  },
  {
    icon: '💡',
    title: 'Inovasi Kreatif',
    desc: 'Selalu mengikuti tren terkini dan teknik animasi terbaru untuk menghadirkan karya yang relevan.',
  },
  {
    icon: '⏰',
    title: 'Tepat Waktu',
    desc: 'Komitmen penuh terhadap deadline tanpa mengorbankan kualitas adalah janji kami kepada klien.',
  },
]

const milestones = [
  { year: '2019', event: 'Eirworks Animation Studio didirikan di Jakarta' },
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
          <div className="badge">◉ Tentang Kami</div>
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
            <div className="badge"> Kisah Kami</div>
            <h2 id="story-title" className="story-title">
              Dari Mimpi Kecil Menjadi <span className="text-gradient">Studio Besar</span>
            </h2>
            <p>
              Eirworks Animation Studio lahir pada 2019 dari sebuah kamar kecil di Jakarta, dengan modal
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
            <div className="badge">💎 Nilai Kami</div>
            <h2 id="values-title" className="section-title">
              Prinsip yang <span className="text-gradient">Memandu Kami</span>
            </h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} id={`value-card-${i}`} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
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
