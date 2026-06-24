import { useMemo, useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, Calendar, BarChart2, Film, TrendingUp, Clock, Home, Layers, LayoutGrid, Info, Smartphone, Monitor } from 'lucide-react'
import {
  getAnalytics,
  getVisitsByDay,
  getHourlyDistribution,
  getTodayVisits,
  getWeekVisits,
  getDeviceSplit,
} from '../../utils/analytics'
import './AdminDashboard.css'

const getPageBadge = (page) => {
  switch (page) {
    case 'home':
      return <><Home size={12} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }} /> Home</>
    case 'services':
      return <><Layers size={12} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }} /> Layanan</>
    case 'projects':
      return <><LayoutGrid size={12} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }} /> Proyek</>
    case 'about':
      return <><Info size={12} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }} /> Tentang Kami</>
    default:
      return <><Film size={12} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }} /> {page}</>
  }
}

/* ─── Mini Line Chart ─── */
function LineChart({ data, label, color = '#7c3aed' }) {
  const values = Object.values(data)
  const labels = Object.keys(data).map(d => d.slice(5)) // MM-DD
  const max = Math.max(...values, 1)
  const w = 400, h = 100, pad = 8

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * (w - pad * 2)
    const y = h - pad - (v / max) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `${pad},${h - pad} ${points} ${w - pad},${h - pad}`

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${w} ${h}`} className="line-chart" aria-label={label}>
        <defs>
          <linearGradient id={`areaGrad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map(f => (
          <line
            key={f}
            x1={pad} y1={h - pad - f * (h - pad * 2)}
            x2={w - pad} y2={h - pad - f * (h - pad * 2)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1"
          />
        ))}
        {/* Area */}
        <polygon points={areaPoints} fill={`url(#areaGrad-${label})`}/>
        {/* Line */}
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Dots */}
        {values.map((v, i) => {
          const x = pad + (i / (values.length - 1 || 1)) * (w - pad * 2)
          const y = h - pad - (v / max) * (h - pad * 2)
          return <circle key={i} cx={x} cy={y} r="3" fill={color} stroke="var(--color-bg-card)" strokeWidth="2"/>
        })}
      </svg>
      <div className="chart-labels">
        {labels.filter((_, i) => i % Math.ceil(labels.length / 7) === 0).map(l => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Bar Chart ─── */
function BarChart({ data, label }) {
  const entries = Object.entries(data).slice(6, 22) // show 6am-10pm
  const max = Math.max(...entries.map(([,v]) => v), 1)
  const hourLabel = (h) => {
    const n = parseInt(h)
    if (n === 0) return '12a'
    if (n < 12) return `${n}a`
    if (n === 12) return '12p'
    return `${n - 12}p`
  }

  return (
    <div className="bar-chart" aria-label={label}>
      {entries.map(([hour, count]) => (
        <div key={hour} className="bar-col">
          <div
            className="bar"
            style={{ height: `${(count / max) * 100}%` }}
            title={`${hour}:00 — ${count} kunjungan`}
          />
          <span className="bar-label">{hourLabel(hour)}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Page Views Doughnut (CSS) ─── */
function PageViewsTable({ pageViews }) {
  const total = Object.values(pageViews).reduce((s, v) => s + v, 0) || 1
  const pages = {
    home: 'Home',
    services: 'Layanan',
    projects: 'Proyek',
    about: 'Tentang Kami',
  }
  const colors = {
    home: '#7c3aed',
    services: '#06b6d4',
    projects: '#f59e0b',
    about: '#10b981',
  }

  return (
    <div className="page-views-list">
      {Object.entries(pages).map(([key, name]) => {
        const count = pageViews[key] || 0
        const pct = Math.round((count / total) * 100)
        return (
          <div key={key} className="pv-row">
            <div className="pv-name">
              <span className="pv-dot" style={{ background: colors[key] }}></span>
              {name}
            </div>
            <div className="pv-bar-wrap">
              <div className="pv-bar" style={{ width: `${pct}%`, background: colors[key] }}></div>
            </div>
            <div className="pv-count">{count} <span className="pv-pct">({pct}%)</span></div>
          </div>
        )
      })}
    </div>
  )
}

function AdminDashboard() {
  const { projects, services, siteSettings, fbActive } = useApp()
  const { adminPassword } = useAuth()
  const [localShowPass, setLocalShowPass] = useState(() => siteSettings?.showPasswordInDashboard || false)

  useEffect(() => {
    setLocalShowPass(siteSettings?.showPasswordInDashboard || false)
  }, [siteSettings])

  // Re-read analytics on every render so data stays fresh after visits
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 30000) // refresh every 30s
    return () => clearInterval(id)
  }, [])

  const analytics    = useMemo(() => getAnalytics(),          [tick])
  const visitsByDay  = useMemo(() => getVisitsByDay(14),      [tick])
  const hourly       = useMemo(() => getHourlyDistribution(), [tick])
  const todayVisits  = useMemo(() => getTodayVisits(),        [tick])
  const weekVisits   = useMemo(() => getWeekVisits(),         [tick])
  const { mobile, desktop } = useMemo(() => getDeviceSplit(), [tick])

  const stats = [
    {
      label: 'Total Kunjungan',
      value: analytics.totalVisits.toLocaleString(),
      icon: <Eye size={20} />,
      color: '#7c3aed',
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Hari Ini',
      value: todayVisits,
      icon: <Calendar size={20} />,
      color: '#06b6d4',
      trend: 'Hari ini',
      trendUp: true,
    },
    {
      label: 'Minggu Ini',
      value: weekVisits,
      icon: <BarChart2 size={20} />,
      color: '#f59e0b',
      trend: '7 hari terakhir',
      trendUp: true,
    },
    {
      label: 'Total Proyek',
      value: projects.length,
      icon: <Film size={20} />,
      color: '#10b981',
      trend: `${services.filter(s => s.active).length} layanan aktif`,
      trendUp: true,
    },
  ]

  const recentVisits = [...(analytics.visits || [])].reverse().slice(0, 10)

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Selamat datang! Ini ringkasan performa website Anda.</p>
        </div>
        <div className="dashboard-header-right">
          <div className="dashboard-date">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <button
            id="dashboard-refresh-btn"
            className="admin-btn admin-btn--secondary admin-btn--sm"
            onClick={() => setTick(t => t + 1)}
            title="Refresh data analytics"
            aria-label="Refresh data"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Keamanan & Akses Panel */}
      <div className="admin-card access-info-card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.5rem', border: '1px solid var(--color-border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="access-info-icon" style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--color-accent-1)', padding: '8px', borderRadius: '8px', display: 'inline-flex' }}>
            <Info size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>Akses & Keamanan Panel</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>Kredensial login panel admin Eirworks</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Tautan Akses</span>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-secondary)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--color-border-light)', height: '28px' }}>
              <code style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{window.location.origin}/#admin</code>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Password Admin</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg-secondary)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--color-border-light)', height: '28px' }}>
              <code style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontFamily: 'monospace', letterSpacing: localShowPass ? 'normal' : '0.15em', whiteSpace: 'nowrap' }}>
                {localShowPass ? adminPassword : '••••••••'}
              </code>
              <button
                type="button"
                onClick={() => setLocalShowPass(!localShowPass)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', padding: 0 }}
                title={localShowPass ? 'Sembunyikan' : 'Tampilkan'}
              >
                {localShowPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          {fbActive && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status Database</span>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-secondary)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.15)', height: '28px' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  Google Firebase
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div
            key={s.label}
            id={`stat-card-${i}`}
            className="stat-card"
            style={{ '--stat-color': s.color }}
          >
            <div className="stat-card__icon">{s.icon}</div>
            <div className="stat-card__body">
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
            <div className={`stat-card__trend ${s.trendUp ? 'trend--up' : 'trend--down'}`}>
              {s.trend}
            </div>
            <div className="stat-card__glow" aria-hidden="true"></div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Traffic over time */}
        <div className="admin-card chart-card">
          <div className="chart-card__header">
            <div>
              <h2 className="chart-title">Traffic 14 Hari Terakhir</h2>
              <p className="chart-subtitle">Jumlah kunjungan per hari</p>
            </div>
            <span className="chart-total">{analytics.totalVisits} total</span>
          </div>
          {analytics.totalVisits === 0 ? (
            <div className="chart-empty">
              <TrendingUp size={36} className="empty-icon-svg" style={{ color: 'var(--color-accent-2)', opacity: 0.7, marginBottom: '0.5rem' }} />
              <p>Belum ada data traffic. Kunjungi website untuk mulai tracking!</p>
            </div>
          ) : (
            <LineChart data={visitsByDay} label="traffic-chart" color="#7c3aed" />
          )}
        </div>

        {/* Device split */}
        <div className="admin-card device-card">
          <h2 className="chart-title">Perangkat</h2>
          <div className="device-chart">
            <div className="device-donut">
              <svg viewBox="0 0 80 80" className="donut-svg">
                <circle cx="40" cy="40" r="30" fill="none" stroke="var(--color-bg-secondary)" strokeWidth="14"/>
                <circle
                  cx="40" cy="40" r="30" fill="none"
                  stroke="#7c3aed" strokeWidth={desktop === 0 ? 0 : 14}
                  strokeDasharray={`${desktop / (mobile + desktop || 1) * 188.5} 188.5`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <circle
                  cx="40" cy="40" r="30" fill="none"
                  stroke="#06b6d4" strokeWidth={mobile === 0 ? 0 : 14}
                  strokeDasharray={`${mobile / (mobile + desktop || 1) * 188.5} 188.5`}
                  strokeLinecap="round"
                  transform={`rotate(${-90 + (desktop / (mobile + desktop || 1)) * 360} 40 40)`}
                />
              </svg>
              <div className="donut-center">
                <span>{mobile + desktop}</span>
                <small>total</small>
              </div>
            </div>
            <div className="device-legend">
              <div className="device-item">
                <span className="device-dot" style={{background:'#7c3aed'}}></span>
                <span>Desktop</span>
                <strong>{desktop}</strong>
              </div>
              <div className="device-item">
                <span className="device-dot" style={{background:'#06b6d4'}}></span>
                <span>Mobile</span>
                <strong>{mobile}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="charts-row">
        {/* Hourly */}
        <div className="admin-card chart-card chart-card--hourly">
          <div className="chart-card__header">
            <div>
              <h2 className="chart-title">Distribusi Jam Kunjungan</h2>
              <p className="chart-subtitle">Jam berapa pengunjung paling aktif</p>
            </div>
          </div>
          <BarChart data={hourly} label="hourly-chart" />
        </div>

        {/* Page views */}
        <div className="admin-card">
          <h2 className="chart-title">Halaman Populer</h2>
          <p className="chart-subtitle" style={{marginBottom:'1.25rem'}}>Distribusi kunjungan per halaman</p>
          <PageViewsTable pageViews={analytics.pageViews || {}} />
        </div>
      </div>

      {/* Recent visits table */}
      <div className="admin-card recent-card">
        <h2 className="chart-title" style={{marginBottom:'1rem'}}>Kunjungan Terbaru</h2>
        {recentVisits.length === 0 ? (
          <div className="chart-empty">
            <Clock size={36} className="empty-icon-svg" style={{ color: 'var(--color-accent-2)', opacity: 0.7, marginBottom: '0.5rem' }} />
            <p>Belum ada kunjungan tercatat.</p>
          </div>
        ) : (
          <div className="visits-table-wrap">
            <table className="visits-table" aria-label="Riwayat kunjungan terbaru">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Halaman</th>
                  <th>Perangkat</th>
                </tr>
              </thead>
              <tbody>
                {recentVisits.map((v, i) => (
                  <tr key={i}>
                    <td>{new Date(v.timestamp).toLocaleString('id-ID', {
                      day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
                    })}</td>
                    <td>
                      <span className="page-badge" style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {getPageBadge(v.page)}
                      </span>
                    </td>
                    <td>
                      <span className={`device-badge device-badge--${v.userAgent.toLowerCase()}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {v.userAgent === 'Mobile' ? <Smartphone size={12} /> : <Monitor size={12} />} {v.userAgent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
