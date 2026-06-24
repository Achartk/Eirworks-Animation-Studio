import { createContext, useContext, useState, useEffect } from 'react'
import { storage, KEYS } from '../utils/storage'
import { db, initFirebase, uploadImageToStorage } from '../utils/firebase'
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'

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
    emoji: 'Palette',
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
    emoji: 'Rocket',
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
    emoji: 'Leaf',
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
    emoji: 'Tent',
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
    emoji: 'Smartphone',
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
    emoji: 'Building',
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
    icon: 'Palette',
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
    icon: 'Globe',
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
    icon: 'Zap',
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
    icon: 'Film',
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
  email: 'eirworkanimation@gmail.com',
  phone: '+62 857-9266-9250',
  location: 'Eirworks Studio, Denpasar',
  heroTitle: 'Wujudkan Ide Anda Menjadi Animasi Yang Memukau',
  heroSubtitle: 'Kami adalah studio animasi 2D & 3D yang menghadirkan visual berkualitas sinematik untuk brand, produk, dan cerita Anda.',
  showPasswordInDashboard: false,
}

const defaultTestimonials = [
  {
    id: 't-1',
    name: 'Klien Eirworks (Dummy)',
    role: 'Partner Kreatif',
    avatar: '👤',
    rating: 5,
    text: 'Review ini bersifat sementara (dummy) sebagai visualisasi layout ulasan klien masa depan Eirworks Animation Studio.',
  },
  {
    id: 't-2',
    name: 'Klien Eirworks (Dummy)',
    role: 'Partner Bisnis',
    avatar: '👤',
    rating: 5,
    text: 'Ulasan dummy untuk mendemonstrasikan penempatan ulasan. Ketika proyek resmi berjalan, ulasan nyata akan ditampilkan di sini.',
  },
  {
    id: 't-3',
    name: 'Klien Eirworks (Dummy)',
    role: 'Mitra Produksi',
    avatar: '👤',
    rating: 5,
    text: 'Placeholder review untuk kebutuhan demonstrasi website. Semua data di section ulasan saat ini masih berupa data dummy.',
  },
]

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

  const [siteSettings, setSiteSettingsState] = useState(() => {
    let stored = storage.get(KEYS.SITE_SETTINGS, defaultSiteSettings)
    // Migrate to real contact details if they are the old default placeholders
    if (stored.email === 'hello@animastudio.id' || stored.phone === '+62 812-3456-789' || stored.email === 'eirworksanimation@gmail.com' || stored.location === 'Eirworks Studio, Jakarta' || stored.phone === '085792669250') {
      stored = {
        ...stored,
        email: 'eirworkanimation@gmail.com',
        phone: '+62 857-9266-9250',
        location: 'Eirworks Studio, Denpasar',
        showPasswordInDashboard: false,
      }
      storage.set(KEYS.SITE_SETTINGS, stored)
    }
    return stored
  })

  const [testimonials, setTestimonialsState] = useState(() =>
    storage.get(KEYS.TESTIMONIALS, defaultTestimonials)
  )

  const [clientMessages, setClientMessagesState] = useState(() =>
    storage.get(KEYS.MESSAGES, [])
  )

  const [fbActive, setFbActive] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  // Trigger Firebase configuration validation
  const reloadFirebase = () => {
    const fb = initFirebase()
    setFbActive(!!fb)
    return !!fb
  }

  useEffect(() => {
    reloadFirebase()
  }, [siteSettings]) // recheck on settings changes

  // Fetch Firestore data
  useEffect(() => {
    if (!fbActive || !db) return

    const loadFromFirebase = async () => {
      setIsSyncing(true)
      try {
        const projSnap = await getDocs(collection(db, 'projects'))
        const fbProjects = []
        projSnap.forEach(d => fbProjects.push({ id: d.id, ...d.data() }))

        const svcSnap = await getDocs(collection(db, 'services'))
        const fbServices = []
        svcSnap.forEach(d => fbServices.push({ id: d.id, ...d.data() }))

        const testSnap = await getDocs(collection(db, 'testimonials'))
        const fbTestimonials = []
        testSnap.forEach(d => fbTestimonials.push({ id: d.id, ...d.data() }))

        const settingsSnap = await getDoc(doc(db, 'settings', 'site'))

        if (fbProjects.length > 0) {
          setProjectsState(fbProjects)
          storage.set(KEYS.PROJECTS, fbProjects)
        }
        if (fbServices.length > 0) {
          setServicesState(fbServices)
          storage.set(KEYS.SERVICES, fbServices)
        }
        if (fbTestimonials.length > 0) {
          setTestimonialsState(fbTestimonials)
          storage.set(KEYS.TESTIMONIALS, fbTestimonials)
        }
        if (settingsSnap.exists()) {
          setSiteSettingsState(settingsSnap.data())
          storage.set(KEYS.SITE_SETTINGS, settingsSnap.data())
        }

        try {
          const msgSnap = await getDocs(collection(db, 'messages'))
          const fbMessages = []
          msgSnap.forEach(d => fbMessages.push({ id: d.id, ...d.data() }))
          if (fbMessages.length > 0) {
            fbMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            setClientMessagesState(fbMessages)
            storage.set(KEYS.MESSAGES, fbMessages)
          }
        } catch (msgErr) {
          console.warn('Failed to load messages from Firestore:', msgErr)
        }
      } catch (error) {
        console.error('Error syncing from Firebase Firestore:', error)
      } finally {
        setIsSyncing(false)
      }
    }

    loadFromFirebase()
  }, [fbActive])

  // Data migration helper
  const migrateLocalToCloud = async () => {
    if (!fbActive || !db) {
      return { success: false, message: 'Firebase belum terkonfigurasi dengan benar!' }
    }
    setIsSyncing(true)
    try {
      // 1. settings
      await setDoc(doc(db, 'settings', 'site'), siteSettings)

      // 2. services
      for (const svc of services) {
        await setDoc(doc(db, 'services', svc.id), svc)
      }

      // 3. testimonials
      for (const t of testimonials) {
        await setDoc(doc(db, 'testimonials', t.id), t)
      }

      // 4. projects
      for (const proj of projects) {
        let finalProj = { ...proj }
        if (proj.image && proj.image.startsWith('data:image')) {
          const cloudUrl = await uploadImageToStorage(proj.image, `projects/${proj.id}`)
          if (cloudUrl) {
            finalProj.image = cloudUrl
          }
        }
        await setDoc(doc(db, 'projects', proj.id), finalProj)
      }

      // 5. client messages
      for (const msg of clientMessages) {
        await setDoc(doc(db, 'messages', msg.id), msg)
      }

      reloadFirebase()
      return { success: true, message: 'Seluruh data berhasil dimigrasikan ke Google Firebase!' }
    } catch (error) {
      console.error('Migration failed:', error)
      return { success: false, message: 'Migrasi gagal: ' + error.message }
    } finally {
      setIsSyncing(false)
    }
  }

  // Persist methods
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

  const setTestimonials = (data) => {
    const updated = typeof data === 'function' ? data(testimonials) : data
    setTestimonialsState(updated)
    storage.set(KEYS.TESTIMONIALS, updated)
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
  const addProject = async (project) => {
    const newId = `proj-${Date.now()}`
    let finalProject = {
      ...project,
      id: newId,
    }

    if (fbActive && project.image && project.image.startsWith('data:image')) {
      const cloudUrl = await uploadImageToStorage(project.image, `projects/${newId}`)
      if (cloudUrl) {
        finalProject.image = cloudUrl
      }
    }

    setProjects((prev) => [finalProject, ...prev])

    if (fbActive && db) {
      try {
        await setDoc(doc(db, 'projects', newId), finalProject)
      } catch (err) {
        console.error('Firebase save error:', err)
      }
    }
    return finalProject
  }

  const updateProject = async (id, updates) => {
    let finalUpdates = { ...updates }

    if (fbActive && updates.image && updates.image.startsWith('data:image')) {
      const cloudUrl = await uploadImageToStorage(updates.image, `projects/${id}`)
      if (cloudUrl) {
        finalUpdates.image = cloudUrl
      }
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...finalUpdates } : p))
    )

    if (fbActive && db) {
      try {
        const projectDoc = doc(db, 'projects', id)
        const currentSnap = await getDoc(projectDoc)
        const currentData = currentSnap.exists() ? currentSnap.data() : {}
        await setDoc(projectDoc, { ...currentData, ...finalUpdates, id })
      } catch (err) {
        console.error('Firebase update error:', err)
      }
    }
  }

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    if (fbActive && db) {
      try {
        await deleteDoc(doc(db, 'projects', id))
      } catch (err) {
        console.error('Firebase delete error:', err)
      }
    }
  }

  // Service CRUD
  const updateService = async (id, updates) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    )
    if (fbActive && db) {
      try {
        await setDoc(doc(db, 'services', id), { ...updates, id })
      } catch (err) {
        console.error('Firebase service update error:', err)
      }
    }
  }

  // Testimonial CRUD
  const addTestimonial = async (testimonial) => {
    const newId = `t-${Date.now()}`
    const newT = {
      ...testimonial,
      id: newId,
    }
    setTestimonials((prev) => [newT, ...prev])
    if (fbActive && db) {
      try {
        await setDoc(doc(db, 'testimonials', newId), newT)
      } catch (err) {
        console.error('Firebase testimonial save error:', err)
      }
    }
    return newT
  }

  const updateTestimonial = async (id, updates) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
    if (fbActive && db) {
      try {
        await setDoc(doc(db, 'testimonials', id), { ...updates, id })
      } catch (err) {
        console.error('Firebase testimonial update error:', err)
      }
    }
  }

  const deleteTestimonial = async (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
    if (fbActive && db) {
      try {
        await deleteDoc(doc(db, 'testimonials', id))
      } catch (err) {
        console.error('Firebase testimonial delete error:', err)
      }
    }
  }

  // Client Messages CRUD
  const setClientMessages = (data) => {
    const updated = typeof data === 'function' ? data(clientMessages) : data
    setClientMessagesState(updated)
    storage.set(KEYS.MESSAGES, updated)
  }

  const addClientMessage = async (msg) => {
    const newId = `msg-${Date.now()}`
    const newMsg = {
      ...msg,
      id: newId,
      timestamp: new Date().toISOString(),
      read: false
    }
    setClientMessages(prev => [newMsg, ...prev])
    if (fbActive && db) {
      try {
        await setDoc(doc(db, 'messages', newId), newMsg)
      } catch (err) {
        console.error('Firebase message save error:', err)
      }
    }
    return newMsg
  }

  const deleteClientMessage = async (id) => {
    setClientMessages(prev => prev.filter(m => m.id !== id))
    if (fbActive && db) {
      try {
        await deleteDoc(doc(db, 'messages', id))
      } catch (err) {
        console.error('Firebase message delete error:', err)
      }
    }
  }

  const markMessageAsRead = async (id) => {
    setClientMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    if (fbActive && db) {
      try {
        const docRef = doc(db, 'messages', id)
        await setDoc(docRef, { read: true }, { merge: true })
      } catch (err) {
        console.error('Firebase message mark read error:', err)
      }
    }
  }

  // Site Settings CRUD with Firebase
  const updateSiteSettings = async (data) => {
    const updated = typeof data === 'function' ? data(siteSettings) : data
    setSiteSettings(updated)
    if (fbActive && db) {
      try {
        await setDoc(doc(db, 'settings', 'site'), updated)
      } catch (err) {
        console.error('Firebase settings save error:', err)
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        projects,
        services,
        siteSettings,
        testimonials,
        clientMessages,
        theme,
        fbActive,
        isSyncing,
        setProjects,
        setServices,
        setSiteSettings: updateSiteSettings,
        setTestimonials,
        toggleTheme,
        addProject,
        updateProject,
        deleteProject,
        updateService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addClientMessage,
        deleteClientMessage,
        markMessageAsRead,
        migrateLocalToCloud,
        reloadFirebase,
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
