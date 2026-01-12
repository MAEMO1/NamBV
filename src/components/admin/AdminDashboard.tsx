'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  statusConfig,
  budgetRangeLabels,
} from '@/lib/validations/quote'

const NAM_TEAL = '#0D7377'
const NAM_GOLD = '#C9A227'

// Types
type QuoteStatus = keyof typeof statusConfig
type BudgetRange = keyof typeof budgetRangeLabels

interface Quote {
  id: string
  referenceNumber: string
  status: QuoteStatus
  fullName: string
  email: string
  phone: string
  postalCode: string
  city?: string
  propertyType: string
  services: string[]
  description?: string
  budgetRange?: BudgetRange
  createdAt: string
  assignedTo?: { id: string; fullName: string } | null
}

interface Appointment {
  id: string
  referenceNumber: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  fullName: string
  email: string
  phone: string
  gemeente: string
  appointmentDate: string
  appointmentTime: string
  projectType?: string
  propertyType?: string
  budget?: string
  message?: string
  createdAt: string
}

const appointmentStatusConfig = {
  PENDING: { label: 'In afwachting', color: '#f59e0b', bg: '#fef3c7' },
  CONFIRMED: { label: 'Bevestigd', color: '#10b981', bg: '#d1fae5' },
  COMPLETED: { label: 'Afgerond', color: '#6366f1', bg: '#e0e7ff' },
  CANCELLED: { label: 'Geannuleerd', color: '#ef4444', bg: '#fee2e2' },
  NO_SHOW: { label: 'Niet verschenen', color: '#6b7280', bg: '#f3f4f6' },
}

// Components
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  loading?: boolean
}

function StatCard({ title, value, subtitle, icon, loading }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{title}</p>
          {loading ? (
            <div className="h-9 w-16 bg-gray-200 animate-pulse rounded" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          )}
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${NAM_TEAL}15` }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

interface QuoteRowProps {
  quote: Quote
  onSelect: (quote: Quote) => void
}

function QuoteRow({ quote, onSelect }: QuoteRowProps) {
  const status = statusConfig[quote.status]
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <tr
      onClick={() => onSelect(quote)}
      className="cursor-pointer transition-colors hover:bg-gray-50"
    >
      <td className="p-4 border-b border-gray-100">
        <div className="font-semibold text-xs" style={{ color: NAM_TEAL }}>
          {quote.referenceNumber}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {formatDate(quote.createdAt)}
        </div>
      </td>
      <td className="p-4 border-b border-gray-100">
        <div className="font-medium text-gray-900">{quote.fullName}</div>
        <div className="text-sm text-gray-500">{quote.email}</div>
      </td>
      <td className="p-4 border-b border-gray-100">
        <div className="text-sm text-gray-900">{quote.services?.join(', ') || '-'}</div>
        <div className="text-sm text-gray-500">{quote.propertyType || '-'} • {quote.postalCode}</div>
      </td>
      <td className="p-4 border-b border-gray-100">
        <span
          className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: status?.bg || '#f3f4f6', color: status?.color || '#666' }}
        >
          {status?.label || quote.status}
        </span>
      </td>
      <td className="p-4 border-b border-gray-100 text-right">
        <span className="text-sm font-medium text-gray-900">
          {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : '—'}
        </span>
      </td>
    </tr>
  )
}

interface AppointmentRowProps {
  appointment: Appointment
  onSelect: (appointment: Appointment) => void
}

function AppointmentRow({ appointment, onSelect }: AppointmentRowProps) {
  const status = appointmentStatusConfig[appointment.status]
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <tr
      onClick={() => onSelect(appointment)}
      className="cursor-pointer transition-colors hover:bg-gray-50"
    >
      <td className="p-4 border-b border-gray-100">
        <div className="font-semibold text-xs" style={{ color: NAM_GOLD }}>
          {appointment.referenceNumber}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {formatDate(appointment.createdAt)}
        </div>
      </td>
      <td className="p-4 border-b border-gray-100">
        <div className="font-medium text-gray-900">{appointment.fullName}</div>
        <div className="text-sm text-gray-500">{appointment.email}</div>
      </td>
      <td className="p-4 border-b border-gray-100">
        <div className="text-sm text-gray-900 font-medium">
          {formatDate(appointment.appointmentDate)} om {appointment.appointmentTime}
        </div>
        <div className="text-sm text-gray-500">{appointment.gemeente}</div>
      </td>
      <td className="p-4 border-b border-gray-100">
        <span
          className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </td>
      <td className="p-4 border-b border-gray-100 text-right">
        <span className="text-sm text-gray-600">
          {appointment.projectType || '—'}
        </span>
      </td>
    </tr>
  )
}

interface QuoteDetailProps {
  quote: Quote
  onClose: () => void
}

function QuoteDetail({ quote, onClose }: QuoteDetailProps) {
  const status = statusConfig[quote.status]
  const [currentStatus, setCurrentStatus] = useState(quote.status)

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[500px] bg-white shadow-2xl z-50 overflow-auto">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{quote.referenceNumber}</h3>
          <span
            className="inline-block mt-2 px-2.5 py-1 rounded-xl text-xs font-semibold"
            style={{ background: status?.bg, color: status?.color }}
          >
            {status?.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-lg border-none bg-gray-100 cursor-pointer text-lg text-gray-500 hover:bg-gray-200"
        >
          ×
        </button>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
            Status wijzigen
          </label>
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value as QuoteStatus)}
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-sm bg-white"
          >
            {Object.entries(statusConfig).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Contactgegevens</h4>
          <div className="grid gap-3">
            <div>
              <div className="text-xs text-gray-500">Naam</div>
              <div className="font-medium">{quote.fullName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">E-mail</div>
              <a href={`mailto:${quote.email}`} className="font-medium" style={{ color: NAM_TEAL }}>
                {quote.email}
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500">Telefoon</div>
              <a href={`tel:${quote.phone}`} className="font-medium" style={{ color: NAM_TEAL }}>
                {quote.phone}
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500">Locatie</div>
              <div className="font-medium">{quote.postalCode} {quote.city}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Projectdetails</h4>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Type woning</div>
            <div className="font-medium">{quote.propertyType || '-'}</div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Diensten</div>
            <div className="flex gap-1.5 flex-wrap">
              {quote.services?.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md text-xs font-medium"
                  style={{ background: `${NAM_TEAL}15`, color: NAM_TEAL }}
                >
                  {s}
                </span>
              )) || '-'}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Budget</div>
            <div className="font-medium">
              {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : 'Niet opgegeven'}
            </div>
          </div>
          {quote.description && (
            <div>
              <div className="text-xs text-gray-500 mb-1">Omschrijving</div>
              <div className="p-3 bg-gray-50 rounded-lg text-sm leading-relaxed">
                {quote.description}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <a
            href={`mailto:${quote.email}`}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm cursor-pointer text-center"
            style={{ border: `2px solid ${NAM_TEAL}`, background: 'white', color: NAM_TEAL }}
          >
            ✉️ E-mail sturen
          </a>
          <a
            href={`tel:${quote.phone}`}
            className="flex-1 py-3.5 rounded-xl border-none text-white font-semibold text-sm cursor-pointer text-center"
            style={{ background: '#10b981' }}
          >
            📞 Bellen
          </a>
        </div>
      </div>
    </div>
  )
}

interface AppointmentDetailProps {
  appointment: Appointment
  onClose: () => void
}

function AppointmentDetail({ appointment, onClose }: AppointmentDetailProps) {
  const status = appointmentStatusConfig[appointment.status]
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[500px] bg-white shadow-2xl z-50 overflow-auto">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{appointment.referenceNumber}</h3>
          <span
            className="inline-block mt-2 px-2.5 py-1 rounded-xl text-xs font-semibold"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-lg border-none bg-gray-100 cursor-pointer text-lg text-gray-500 hover:bg-gray-200"
        >
          ×
        </button>
      </div>

      <div className="p-6">
        {/* Appointment Info */}
        <div className="bg-amber-50 rounded-xl p-5 mb-6 border border-amber-200">
          <h4 className="text-sm font-semibold text-amber-900 mb-3">📅 Afspraak</h4>
          <div className="text-lg font-medium text-amber-900">
            {formatDate(appointment.appointmentDate)}
          </div>
          <div className="text-amber-700 mt-1">
            om {appointment.appointmentTime}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Contactgegevens</h4>
          <div className="grid gap-3">
            <div>
              <div className="text-xs text-gray-500">Naam</div>
              <div className="font-medium">{appointment.fullName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">E-mail</div>
              <a href={`mailto:${appointment.email}`} className="font-medium" style={{ color: NAM_TEAL }}>
                {appointment.email}
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500">Telefoon</div>
              <a href={`tel:${appointment.phone}`} className="font-medium" style={{ color: NAM_TEAL }}>
                {appointment.phone}
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500">Gemeente</div>
              <div className="font-medium">{appointment.gemeente}</div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        {(appointment.projectType || appointment.propertyType || appointment.budget) && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Projectvoorkeuren</h4>
            {appointment.projectType && (
              <div className="mb-2">
                <span className="text-xs text-gray-500">Project: </span>
                <span className="font-medium">{appointment.projectType}</span>
              </div>
            )}
            {appointment.propertyType && (
              <div className="mb-2">
                <span className="text-xs text-gray-500">Woning: </span>
                <span className="font-medium">{appointment.propertyType}</span>
              </div>
            )}
            {appointment.budget && (
              <div className="mb-2">
                <span className="text-xs text-gray-500">Budget: </span>
                <span className="font-medium">{appointment.budget}</span>
              </div>
            )}
          </div>
        )}

        {/* Message */}
        {appointment.message && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Bericht</h4>
            <div className="p-3 bg-gray-50 rounded-lg text-sm leading-relaxed">
              {appointment.message}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <a
            href={`mailto:${appointment.email}`}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm cursor-pointer text-center"
            style={{ border: `2px solid ${NAM_TEAL}`, background: 'white', color: NAM_TEAL }}
          >
            ✉️ E-mail sturen
          </a>
          <a
            href={`tel:${appointment.phone}`}
            className="flex-1 py-3.5 rounded-xl border-none text-white font-semibold text-sm cursor-pointer text-center"
            style={{ background: '#10b981' }}
          >
            📞 Bellen
          </a>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function AdminDashboard() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<'dashboard' | 'quotes' | 'appointments' | 'settings'>('dashboard')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Data states
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const [quotesRes, appointmentsRes] = await Promise.all([
        fetch('/api/admin/quotes'),
        fetch('/api/appointments')
      ])

      if (quotesRes.ok) {
        const quotesData = await quotesRes.json()
        setQuotes(quotesData.quotes || [])
      }

      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json()
        setAppointments(appointmentsData.appointments || [])
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Kon gegevens niet laden')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  // Analytics calculations
  const totalQuotes = quotes.length
  const newQuotes = quotes.filter(q => q.status === 'NEW').length
  const totalAppointments = appointments.length
  const pendingAppointments = appointments.filter(a => a.status === 'PENDING').length

  const quotesByStatus = useMemo(() => {
    return (Object.keys(statusConfig) as QuoteStatus[]).reduce((acc, status) => {
      acc[status] = quotes.filter(q => q.status === status).length
      return acc
    }, {} as Record<QuoteStatus, number>)
  }, [quotes])

  const filteredQuotes = statusFilter === 'all'
    ? quotes
    : quotes.filter(q => q.status === statusFilter)

  const navItems = [
    { id: 'dashboard' as const, icon: '📊', label: 'Dashboard' },
    { id: 'quotes' as const, icon: '📋', label: 'Offertes', badge: newQuotes },
    { id: 'appointments' as const, icon: '📅', label: 'Afspraken', badge: pendingAppointments },
    { id: 'settings' as const, icon: '⚙️', label: 'Instellingen' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className="bg-gray-900 text-white flex flex-col transition-all duration-200"
        style={{ width: sidebarOpen ? '260px' : '72px' }}
      >
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 text-white"
            style={{ background: NAM_TEAL }}
          >
            NAM
          </div>
          {sidebarOpen && (
            <div>
              <div className="font-semibold text-sm">Nam Admin</div>
              <div className="text-xs text-gray-400">Dashboard</div>
            </div>
          )}
        </div>

        <nav className="p-3 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className="w-full rounded-xl border-none text-white text-sm font-medium cursor-pointer flex items-center gap-3 mb-1 relative"
              style={{
                padding: sidebarOpen ? '12px 16px' : '12px',
                background: currentView === item.id ? NAM_TEAL : 'transparent',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && item.label}
              {item.badge && item.badge > 0 && sidebarOpen && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-lg border border-gray-700 bg-transparent text-gray-400 cursor-pointer text-xs hover:bg-gray-800 hover:text-white transition-colors"
          >
            {sidebarOpen ? '🚪 Uitloggen' : '🚪'}
          </button>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="m-4 p-3 rounded-lg border border-gray-700 bg-transparent text-gray-400 cursor-pointer text-xs"
        >
          {sidebarOpen ? '← Inklappen' : '→'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white px-8 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'quotes' && 'Offerteaanvragen'}
              {currentView === 'appointments' && 'Adviesgesprekken'}
              {currentView === 'settings' && 'Instellingen'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('nl-BE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchData}
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white cursor-pointer text-lg hover:bg-gray-50"
              title="Vernieuwen"
            >
              🔄
            </button>
            <div className="relative">
              {(newQuotes + pendingAppointments) > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center">
                  {newQuotes + pendingAppointments}
                </span>
              )}
              <button className="w-10 h-10 rounded-xl border border-gray-200 bg-white cursor-pointer text-lg">
                🔔
              </button>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: `linear-gradient(135deg, ${NAM_TEAL} 0%, ${NAM_GOLD} 100%)` }}
            >
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                  title="Offerteaanvragen"
                  value={totalQuotes}
                  subtitle="Totaal"
                  icon="📋"
                  loading={loading}
                />
                <StatCard
                  title="Nieuwe aanvragen"
                  value={newQuotes}
                  subtitle="Wacht op reactie"
                  icon="📬"
                  loading={loading}
                />
                <StatCard
                  title="Adviesgesprekken"
                  value={totalAppointments}
                  subtitle="Totaal ingepland"
                  icon="📅"
                  loading={loading}
                />
                <StatCard
                  title="In afwachting"
                  value={pendingAppointments}
                  subtitle="Te bevestigen"
                  icon="⏳"
                  loading={loading}
                />
              </div>

              {/* Status Overview */}
              {quotes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                  <h3 className="text-base font-semibold mb-5">Status overzicht offertes</h3>
                  <div className="flex gap-3 flex-wrap">
                    {(Object.entries(statusConfig) as [QuoteStatus, typeof statusConfig[QuoteStatus]][]).map(([key, config]) => (
                      <div
                        key={key}
                        onClick={() => { setStatusFilter(key); setCurrentView('quotes') }}
                        className="p-3 px-5 rounded-xl cursor-pointer transition-transform hover:scale-105"
                        style={{ background: config.bg }}
                      >
                        <div className="text-2xl font-bold" style={{ color: config.color }}>
                          {quotesByStatus[key] || 0}
                        </div>
                        <div className="text-xs font-medium" style={{ color: config.color }}>
                          {config.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Items Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Quotes */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-base font-semibold">Recente offertes</h3>
                    <button
                      onClick={() => setCurrentView('quotes')}
                      className="px-4 py-2 rounded-lg border-none text-xs font-medium cursor-pointer"
                      style={{ background: `${NAM_TEAL}15`, color: NAM_TEAL }}
                    >
                      Alles bekijken →
                    </button>
                  </div>
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : quotes.length > 0 ? (
                    <div className="space-y-2">
                      {quotes.slice(0, 5).map(quote => (
                        <div
                          key={quote.id}
                          onClick={() => setSelectedQuote(quote)}
                          className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{quote.fullName}</p>
                              <p className="text-xs text-gray-500">{quote.referenceNumber}</p>
                            </div>
                            <span
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: statusConfig[quote.status]?.bg,
                                color: statusConfig[quote.status]?.color
                              }}
                            >
                              {statusConfig[quote.status]?.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Nog geen offertes</p>
                  )}
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-base font-semibold">Recente afspraken</h3>
                    <button
                      onClick={() => setCurrentView('appointments')}
                      className="px-4 py-2 rounded-lg border-none text-xs font-medium cursor-pointer"
                      style={{ background: `${NAM_GOLD}20`, color: NAM_GOLD }}
                    >
                      Alles bekijken →
                    </button>
                  </div>
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : appointments.length > 0 ? (
                    <div className="space-y-2">
                      {appointments.slice(0, 5).map(appointment => (
                        <div
                          key={appointment.id}
                          onClick={() => setSelectedAppointment(appointment)}
                          className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{appointment.fullName}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(appointment.appointmentDate).toLocaleDateString('nl-BE')} om {appointment.appointmentTime}
                              </p>
                            </div>
                            <span
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: appointmentStatusConfig[appointment.status].bg,
                                color: appointmentStatusConfig[appointment.status].color
                              }}
                            >
                              {appointmentStatusConfig[appointment.status].label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Nog geen afspraken</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Quotes List View */}
          {currentView === 'quotes' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="px-4 py-2 rounded-lg text-xs font-medium cursor-pointer"
                    style={{
                      border: statusFilter === 'all' ? 'none' : '1px solid #e5e5e5',
                      background: statusFilter === 'all' ? NAM_TEAL : 'white',
                      color: statusFilter === 'all' ? 'white' : '#666'
                    }}
                  >
                    Alles ({quotes.length})
                  </button>
                  {(Object.entries(statusConfig).slice(0, 4) as [QuoteStatus, typeof statusConfig[QuoteStatus]][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setStatusFilter(key)}
                      className="px-4 py-2 rounded-lg text-xs font-medium cursor-pointer"
                      style={{
                        border: statusFilter === key ? 'none' : '1px solid #e5e5e5',
                        background: statusFilter === key ? config.color : 'white',
                        color: statusFilter === key ? 'white' : '#666'
                      }}
                    >
                      {config.label} ({quotesByStatus[key] || 0})
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : filteredQuotes.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Referentie</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Klant</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-3 text-right text-xs text-gray-500 uppercase tracking-wider">Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotes.map(quote => (
                      <QuoteRow key={quote.id} quote={quote} onSelect={setSelectedQuote} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  Geen aanvragen gevonden
                </div>
              )}
            </div>
          )}

          {/* Appointments List View */}
          {currentView === 'appointments' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Alle adviesgesprekken</h3>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : appointments.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Referentie</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Klant</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Afspraak</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-3 text-right text-xs text-gray-500 uppercase tracking-wider">Project</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                        onSelect={setSelectedAppointment}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  Nog geen afspraken ingepland
                </div>
              )}
            </div>
          )}

          {/* Settings View */}
          {currentView === 'settings' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Instellingen</h3>
              <p className="text-gray-500">Instellingen worden binnenkort toegevoegd.</p>
            </div>
          )}
        </div>
      </main>

      {/* Quote Detail Sidebar */}
      {selectedQuote && (
        <>
          <div
            onClick={() => setSelectedQuote(null)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <QuoteDetail
            quote={selectedQuote}
            onClose={() => setSelectedQuote(null)}
          />
        </>
      )}

      {/* Appointment Detail Sidebar */}
      {selectedAppointment && (
        <>
          <div
            onClick={() => setSelectedAppointment(null)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <AppointmentDetail
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
          />
        </>
      )}
    </div>
  )
}
