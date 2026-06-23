import { createContext, useContext, useState, useEffect } from 'react'
import { storage, KEYS } from '../utils/storage'

// ===========================
// DEFAULT DATA
// ===========================
const defaultProjects = [
  {
    id: 'proj-1',
    title: 'BrandWave — Brand Identity Animation',
    client: 'BrandWave Corp',
    category: 'Motion Graphics',
    year: '2024',
    duration: '14 hari',
    tags: ['After Effects', 'Logo Animation', 'Brand'],
    emoji: '🎨',
    color: '#7c3aed',
    accent: '#a855f7',
    desc: 'Animasi identitas brand lengkap termasuk logo reveal, brand guideline animation, dan paket aset untuk media sosial.',
    featured: true,
    image: null,
  },
  {
    id: 'proj-2',
    title: 'SpaceVoyage — Sci-Fi Short Film',
    client: 'IndieFilm Studio',
    category: 'Animasi 3D',
    year: '2024',
    duration: '45 hari',
    tags: ['Blender', 'Cinema 4D', 'VFX', 'Rendering'],
    emoji: '🚀',
    color: '#06b6d4',
    accent: '#38bdf8',
    desc: 'Film pendek animasi 3D bertemakan sci-fi dengan visual effects sinematik dan lighting berkualitas tinggi.',
    featured: true,
    image: null,
  },
  {
    id: 'proj-3',
    title: 'EcoLife — Environmental Explainer',
    client: 'EcoLife Foundation',
    category: 'Explainer Video',
    year: '2023',
    duration: '21 hari',
    tags: ['2D Animation', 'Voiceover', 'Infographic'],
    emoji: '🌿',
    color: '#10b981',
    accent: '#34d399',
    desc: 'Video explainer tentang isu lingkungan dengan gaya 2D yang bersahabat dan narasi yang kuat.',
    featured: false,
    image: null,
  },
  {
    id: 'proj-4',
    title: 'KidsTale — Animated Series Pilot',
    client: 'Kiddie Media',
    category: 'Animasi 2D',
    year: '2023',
    duration: '60 hari',
    tags: ['Character Animation', 'Storyboard', 'Rigging'],
    emoji: '🎪',
    color: '#f59e0b',
    accent: '#fbbf24',
    desc: 'Pilot episode serial animasi 2D anak-anak dengan karakter orisinal yang ekspresif dan penuh warna.',
    featured: true,
    image: null,
  },
  {
    id: 'proj-5',
    title: 'FinTech Pro — App Promo Video',
    client: 'StartUp.io',
    category: 'Motion Graphics',
    year: '2023',
    duration: '10 hari',
    tags: ['UI Animation', 'Motion Design', 'Lottie'],
    emoji: '📱',
    color: '#8b5cf6',
    accent: '#a78bfa',
    desc: 'Video promosi aplikasi fintech dengan animasi UI yang smooth dan pesan yang jelas kepada calon pengguna.',
    featured: false,
    image: null,
  },
  {
    id: 'proj-6',
    title: 'ArchViz Tower — 3D Visualization',
    client: 'BuildPro Realty',
    category: 'Animasi 3D',
    year: '2024',
    duration: '30 hari',
    tags: ['ArchViz', '3D Rendering', 'Walkthrough'],
    emoji: '🏗️',
    color: '#ef4444',
    accent: '#f87171',
    desc: 'Visualisasi arsitektur 3D gedung bertingkat dengan interior walkthrough yang realistis dan material photoreal.',
    featured: false,
    image: null,
  },
]

const defaultServices = [
  {
    id: 'anim-2d',
    icon: '🎨',
    title: 'Animasi 2D',
    shortDesc: 'Karakter & storytelling animasi 2D yang hidup dan ekspresif',
    fullDesc: 'Layanan animasi 2D kami mencakup pembuatan karakter orisinal, rigging, animasi gerak, dan produksi final.',
    features: ['Character Design & Rigging', 'Frame-by-Frame Animation', 'Scene & Background Art', 'Lip Sync & Expressions', 'Color Grading & FX'],
    price: 'Mulai dari Rp 3.500.000',
    duration: '7–21 hari',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    active: true,
  },
  {
    id: 'anim-3d',
    icon: '🌐',
    title: 'Animasi 3D',
    shortDesc: 'Visualisasi 3D realistis untuk produk, arsitektur & film',
    fullDesc: 'Dengan pipeline 3D industry-standard, kami menghadirkan model, tekstur, pencahayaan, dan rendering berkualitas sinematik.',
    features: ['3D Modeling & Texturing', 'Rigging & Animation', 'Lighting & Shading', 'Visual Effects (VFX)', 'Cinematic Rendering 4K'],
    price: 'Mulai dari Rp 7.500.000',
    duration: '14–30 hari',
    gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    active: true,
  },
  {
    id: 'motion-graphics',
    icon: '⚡',
    title: 'Motion Graphics',
    shortDesc: 'Grafis bergerak dinamis untuk branding & konten digital',
    fullDesc: 'Motion graphics kami dirancang untuk meningkatkan visual brand Anda dari title sequence hingga social media content.',
    features: ['Logo Animation', 'Title Sequence & Opener', 'Social Media Content', 'Infographic Animation', 'UI/UX Animation'],
    price: 'Mulai dari Rp 1.500.000',
    duration: '3–10 hari',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    active: true,
  },
  {
    id: 'explainer',
    icon: '🎬',
    title: 'Explainer Video',
    shortDesc: 'Video penjelasan yang meningkatkan pemahaman & konversi',
    fullDesc: 'Explainer video kami menggabungkan narasi yang kuat, visual yang menarik, dan pesan yang jelas untuk kampanye pemasaran.',
    features: ['Script & Storyboard', 'Voiceover Professional', 'Animation Production', 'Sound Design & Music', 'Multi-format Export'],
    price: 'Mulai dari Rp 5.000.000',
    duration: '10–21 hari',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    active: true,
  },
]

const defaultSiteSettings = {
  siteName: 'Eirworks Animation Studio',
  tagline: 'Jasa Animasi 2D & 3D Profesional',
  email: 'hello@animastudio.id',
  phone: '+62 812-3456-789',
  location: 'Jakarta, Indonesia',
  heroTitle: 'Wujudkan Ide Anda Menjadi Animasi Yang Memukau',
  heroSubtitle: 'Kami adalah studio animasi 2D & 3D yang menghadirkan visual berkualitas sinematik untuk brand, produk, dan cerita Anda.',
}

// ===========================
// CONTEXT
// ===========================
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [projects, setProjectsState] = useState(() => {
    let stored = storage.get(KEYS.PROJECTS, defaultProjects)
    let needsUpdate = false
    stored = stored.map((p, i) => {
      if (!p.image) {
        needsUpdate = true
        if (i === 0) p.image = '/3D Assets Point.jpeg'
        else if (i === 1) p.image = '/3D Assets.jpeg'
        else if (i === 2) p.image = '/2D Assets.jpeg'
        else p.image = '/logo.svg'
      }
      return p
    })
    if (needsUpdate) storage.set(KEYS.PROJECTS, stored)
    return stored
  })

  const [services, setServicesState] = useState(() =>
    storage.get(KEYS.SERVICES, defaultServices)
  )

  const [siteSettings, setSiteSettingsState] = useState(() =>
    storage.get(KEYS.SITE_SETTINGS, defaultSiteSettings)
  )

  // Persist whenever data changes
  const setProjects = (data) => {
    const updated = typeof data === 'function' ? data(projects) : data
    setProjectsState(updated)
    storage.set(KEYS.PROJECTS, updated)
  }

  const setServices = (data) => {
    const updated = typeof data === 'function' ? data(services) : data
    setServicesState(updated)
    storage.set(KEYS.SERVICES, updated)
  }

  const setSiteSettings = (data) => {
    const updated = typeof data === 'function' ? data(siteSettings) : data
    setSiteSettingsState(updated)
    storage.set(KEYS.SITE_SETTINGS, updated)
  }

  // Theme Management
  const [theme, setThemeState] = useState(() => {
    return storage.get('theme', 'light')
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    storage.set('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Project CRUD
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`,
    }
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  // Service CRUD
  const updateService = (id, updates) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    )
  }

  return (
    <AppContext.Provider
      value={{
        projects,
        services,
        siteSettings,
        theme,
        setProjects,
        setServices,
        setSiteSettings,
        toggleTheme,
        addProject,
        updateProject,
        deleteProject,
        updateService,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
