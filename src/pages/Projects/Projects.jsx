import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Palette, Globe, Zap, Film, Clock, MessageSquare, Workflow, HelpCircle, Rocket, Leaf, Tent, Smartphone, Building, Gamepad2, Star, Sparkles, Target, Tv, Video, LayoutGrid } from 'lucide-react'
import './Projects.css'

const CATEGORIES = ['Semua', 'Animasi 2D', 'Animasi 3D', 'Motion Graphics', 'Explainer Video']

const iconMap = {
  // Compatibility with old emoji data
  '🎨': Palette,
  '🌐': Globe,
  '⚡': Zap,
  '🎬': Film,
  '🚀': Rocket,
  '🌿': Leaf,
  '🎪': Tent,
  '📱': Smartphone,
  '🏗️': Building,
  '🎭': Film,
  '🎮': Gamepad2,
  '🌟': Star,
  '💫': Sparkles,
  '🎯': Target,
  '🔮': Sparkles,
  // Lucide Names
  'Palette': Palette,
  'Globe': Globe,
  'Zap': Zap,
  'Film': Film,
  'Rocket': Rocket,
  'Leaf': Leaf,
  'Tent': Tent,
  'Smartphone': Smartphone,
  'Building': Building,
  'Gamepad2': Gamepad2,
  'Star': Star,
  'Sparkles': Sparkles,
  'Target': Target,
  'Tv': Tv,
  'Video': Video,
}




function Projects() {
  const { projects } = useApp()
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'Semua'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="projects-page">
      {/* Page Hero */}
      <section className="page-hero projects-hero" aria-labelledby="projects-title">
        <div className="page-hero__bg">
          <div className="orb orb--services-1"></div>
          <div className="orb orb--services-2"></div>
        </div>
        <div className="container page-hero__content">
          <div className="badge"><LayoutGrid size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Portfolio Kami</div>
          <h1 id="projects-title" className="page-hero__title">
            Hasil Kerja yang <span className="text-gradient">Berbicara Sendiri</span>
          </h1>
          <p className="page-hero__subtitle">
            Setiap proyek adalah cerita. Berikut sebagian karya terbaik
            yang telah kami wujudkan bersama klien kami.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="projects-section section-padding" aria-labelledby="projects-list">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Filter kategori proyek">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="projects-featured" aria-label="Proyek unggulan">
            {filtered.filter(p => p.featured).map((proj) => (
              <div
                key={proj.id}
                id={proj.id}
                className="project-card project-card--featured"
                style={{ '--proj-color': proj.color, '--proj-accent': proj.accent }}
                onClick={() => setSelectedProject(proj)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(proj)}
                aria-label={`Lihat detail proyek ${proj.title}`}
              >
                <div className="project-card__visual">
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} className="project-img" style={{ objectPosition: `center ${proj.imagePos || 50}%`, objectFit: proj.image === '/logo.svg' ? 'contain' : 'cover' }} />
                  ) : (
                    <div className="project-emoji">
                      {(() => {
                        const IconComponent = iconMap[proj.emoji] || Film
                        return <IconComponent size={48} className="project-icon-svg" />
                      })()}
                    </div>
                  )}
                  <div className="project-glow" aria-hidden="true"></div>
                </div>
                <div className="project-card__info">
                  <div className="project-card__meta">
                    <span className="project-category">{proj.category}</span>
                    <span className="project-year">{proj.year}</span>
                  </div>
                  <h2 className="project-card__title">{proj.title}</h2>
                  <p className="project-card__client">Klien: {proj.client}</p>
                  <p className="project-card__desc">{proj.desc}</p>
                  <div className="project-tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <span className="project-duration">
                      <Clock size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {proj.duration}
                    </span>
                    <button
                      className="project-view-btn"
                      id={`view-${proj.id}`}
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(proj) }}
                    >
                      Detail Proyek →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regular Projects Grid */}
          <div
            className="projects-grid"
            aria-label="Semua proyek"
            id="projects-list"
          >
            {filtered.filter(p => !p.featured).map((proj) => (
              <div
                key={proj.id}
                id={proj.id}
                className="project-card project-card--regular"
                style={{ '--proj-color': proj.color, '--proj-accent': proj.accent }}
                onClick={() => setSelectedProject(proj)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(proj)}
                aria-label={`Lihat detail proyek ${proj.title}`}
              >
                <div className="project-card__visual project-card__visual--small">
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} className="project-img" style={{ objectPosition: `center ${proj.imagePos || 50}%`, objectFit: proj.image === '/logo.svg' ? 'contain' : 'cover', padding: proj.image === '/logo.svg' ? '20px' : '0' }} />
                  ) : (
                    <div className="project-emoji project-emoji--small">
                      {(() => {
                        const IconComponent = iconMap[proj.emoji] || Film
                        return <IconComponent size={28} className="project-icon-svg" />
                      })()}
                    </div>
                  )}
                  <div className="project-glow" aria-hidden="true"></div>
                </div>
                <div className="project-card__meta">
                  <span className="project-category">{proj.category}</span>
                  <span className="project-year">{proj.year}</span>
                </div>
                <h3 className="project-card__title project-card__title--sm">{proj.title}</h3>
                <p className="project-card__client">{proj.client}</p>
                <p className="project-card__desc project-card__desc--sm">{proj.desc}</p>
                <div className="project-tags">
                  {proj.tags.slice(0, 2).map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="projects-empty" aria-live="polite">
              <Film size={36} className="empty-icon-svg" style={{ color: 'var(--color-accent-2)', opacity: 0.7, marginBottom: '1rem' }} />
              <p>Tidak ada proyek dalam kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Detail proyek: ${selectedProject.title}`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal__inner"
            style={{ '--proj-color': selectedProject.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              id="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Tutup detail proyek"
            >
              ✕
            </button>
            <div className="modal-visual">
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" style={{ objectPosition: `center ${selectedProject.imagePos || 50}%`, objectFit: selectedProject.image === '/logo.svg' ? 'contain' : 'cover', padding: selectedProject.image === '/logo.svg' ? '20px' : '0' }} />
              ) : (
                <span className="modal-emoji">
                  {(() => {
                    const IconComponent = iconMap[selectedProject.emoji] || Film
                    return <IconComponent size={64} className="project-icon-svg" />
                  })()}
                </span>
              )}
            </div>
            <div className="modal-content">
              <div className="project-card__meta">
                <span className="project-category">{selectedProject.category}</span>
                <span className="project-year">{selectedProject.year}</span>
              </div>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-client">Klien: {selectedProject.client}</p>
              <p className="modal-desc">{selectedProject.desc}</p>
              <div className="modal-details">
                <div className="modal-detail">
                  <span className="modal-detail-label">Durasi</span>
                  <span className="modal-detail-value">{selectedProject.duration}</span>
                </div>
                <div className="modal-detail">
                  <span className="modal-detail-label">Kategori</span>
                  <span className="modal-detail-value">{selectedProject.category}</span>
                </div>
              </div>
              <div className="project-tags">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
