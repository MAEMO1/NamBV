'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Bell,
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  Briefcase,
  Euro,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Users,
  CalendarClock,
  FileCheck,
} from 'lucide-react'
import {
  statusConfig,
  budgetRangeLabels,
} from '@/lib/validations/quote'
import Logo from '@/components/Logo'

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

// Status configurations with brand colors
const appointmentStatusConfig = {
  PENDING: { label: 'In afwachting', color: '#b45309', bg: '#fef3c7' },
  CONFIRMED: { label: 'Bevestigd', color: '#047857', bg: '#d1fae5' },
  COMPLETED: { label: 'Afgerond', color: '#4338ca', bg: '#e0e7ff' },
  CANCELLED: { label: 'Geannuleerd', color: '#dc2626', bg: '#fee2e2' },
  NO_SHOW: { label: 'Niet verschenen', color: '#57534e', bg: '#f5f5f4' },
}

// Stat Card Component
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  loading?: boolean
  accent?: boolean
}

function StatCard({ title, value, subtitle, icon, loading, accent }: StatCardProps) {
  return (
    <div className={`bg-white border transition-all duration-300 hover:shadow-soft p-6 ${accent ? 'border-accent-200' : 'border-noir-100'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-noir-500 mb-2 uppercase tracking-wider font-medium">{title}</p>
          {loading ? (
            <div className="h-9 w-16 bg-noir-100 animate-pulse" />
          ) : (
            <p className="text-3xl font-display font-medium text-noir-900 mb-1">{value}</p>
          )}
          {subtitle && <p className="text-xs text-noir-400">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center ${accent ? 'bg-accent-50 text-accent-600' : 'bg-noir-50 text-noir-600'}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// Quote Row Component
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
      className="cursor-pointer transition-colors hover:bg-ivory-100 group"
    >
      <td className="p-4 border-b border-noir-100">
        <div className="font-medium text-accent-600 text-sm">
          {quote.referenceNumber}
        </div>
        <div className="text-xs text-noir-400 mt-0.5">
          {formatDate(quote.createdAt)}
        </div>
      </td>
      <td className="p-4 border-b border-noir-100">
        <div className="font-medium text-noir-900">{quote.fullName}</div>
        <div className="text-sm text-noir-500">{quote.email}</div>
      </td>
      <td className="p-4 border-b border-noir-100">
        <div className="text-sm text-noir-900">{quote.services?.join(', ') || '-'}</div>
        <div className="text-sm text-noir-500">{quote.propertyType || '-'} • {quote.postalCode}</div>
      </td>
      <td className="p-4 border-b border-noir-100">
        <span
          className="inline-block px-3 py-1.5 text-xs font-medium"
          style={{ background: status?.bg || '#f5f5f4', color: status?.color || '#57534e' }}
        >
          {status?.label || quote.status}
        </span>
      </td>
      <td className="p-4 border-b border-noir-100 text-right">
        <span className="text-sm font-medium text-noir-700">
          {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : '—'}
        </span>
      </td>
    </tr>
  )
}

// Appointment Row Component
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
      className="cursor-pointer transition-colors hover:bg-ivory-100"
    >
      <td className="p-4 border-b border-noir-100">
        <div className="font-medium text-accent-600 text-sm">
          {appointment.referenceNumber}
        </div>
        <div className="text-xs text-noir-400 mt-0.5">
          {formatDate(appointment.createdAt)}
        </div>
      </td>
      <td className="p-4 border-b border-noir-100">
        <div className="font-medium text-noir-900">{appointment.fullName}</div>
        <div className="text-sm text-noir-500">{appointment.email}</div>
      </td>
      <td className="p-4 border-b border-noir-100">
        <div className="text-sm text-noir-900 font-medium">
          {formatDate(appointment.appointmentDate)} om {appointment.appointmentTime}
        </div>
        <div className="text-sm text-noir-500">{appointment.gemeente}</div>
      </td>
      <td className="p-4 border-b border-noir-100">
        <span
          className="inline-block px-3 py-1.5 text-xs font-medium"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </td>
      <td className="p-4 border-b border-noir-100 text-right">
        <span className="text-sm text-noir-600">
          {appointment.projectType || '—'}
        </span>
      </td>
    </tr>
  )
}

// Quote Detail Sidebar
interface QuoteDetailProps {
  quote: Quote
  onClose: () => void
}

function QuoteDetail({ quote, onClose }: QuoteDetailProps) {
  const status = statusConfig[quote.status]
  const [currentStatus, setCurrentStatus] = useState(quote.status)

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[480px] bg-white shadow-soft-xl z-50 overflow-auto border-l border-noir-100">
      {/* Header */}
      <div className="p-6 border-b border-noir-100 flex justify-between items-center sticky top-0 bg-white">
        <div>
          <h3 className="text-lg font-display font-medium text-noir-900">{quote.referenceNumber}</h3>
          <span
            className="inline-block mt-2 px-3 py-1 text-xs font-medium"
            style={{ background: status?.bg, color: status?.color }}
          >
            {status?.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-noir-50 hover:bg-noir-100 transition-colors text-noir-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        {/* Status Change */}
        <div className="mb-8">
          <label className="block text-xs text-noir-500 uppercase tracking-wider mb-3 font-medium">
            Status wijzigen
          </label>
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value as QuoteStatus)}
            className="w-full p-4 border border-noir-200 text-sm bg-white focus:border-accent-500 focus:outline-none transition-colors"
          >
            {Object.entries(statusConfig).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Info */}
        <div className="bg-ivory-100 p-6 mb-8">
          <h4 className="text-sm font-display font-medium text-noir-900 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-accent-600" />
            Contactgegevens
          </h4>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Naam</div>
              <div className="font-medium text-noir-900 mt-1">{quote.fullName}</div>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">E-mail</div>
              <a href={`mailto:${quote.email}`} className="font-medium text-accent-600 mt-1 block hover:text-accent-700 transition-colors">
                {quote.email}
              </a>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Telefoon</div>
              <a href={`tel:${quote.phone}`} className="font-medium text-accent-600 mt-1 block hover:text-accent-700 transition-colors">
                {quote.phone}
              </a>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Locatie</div>
              <div className="font-medium text-noir-900 mt-1">{quote.postalCode} {quote.city}</div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="mb-8">
          <h4 className="text-sm font-display font-medium text-noir-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent-600" />
            Projectdetails
          </h4>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Type woning</div>
              <div className="font-medium text-noir-900 mt-1">{quote.propertyType || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider mb-2">Diensten</div>
              <div className="flex gap-2 flex-wrap">
                {quote.services?.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-accent-50 text-accent-700 text-xs font-medium"
                  >
                    {s}
                  </span>
                )) || '-'}
              </div>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Budget</div>
              <div className="font-medium text-noir-900 mt-1">
                {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : 'Niet opgegeven'}
              </div>
            </div>
            {quote.description && (
              <div>
                <div className="text-xs text-noir-500 uppercase tracking-wider mb-2">Omschrijving</div>
                <div className="p-4 bg-ivory-100 text-sm leading-relaxed text-noir-700">
                  {quote.description}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-noir-100">
          <a
            href={`mailto:${quote.email}`}
            className="flex-1 py-4 border border-accent-600 bg-white text-accent-600 font-medium text-sm text-center hover:bg-accent-50 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            E-mail sturen
          </a>
          <a
            href={`tel:${quote.phone}`}
            className="flex-1 py-4 bg-accent-600 text-white font-medium text-sm text-center hover:bg-accent-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Bellen
          </a>
        </div>
      </div>
    </div>
  )
}

// Appointment Detail Sidebar
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
    <div className="fixed top-0 right-0 bottom-0 w-[480px] bg-white shadow-soft-xl z-50 overflow-auto border-l border-noir-100">
      {/* Header */}
      <div className="p-6 border-b border-noir-100 flex justify-between items-center sticky top-0 bg-white">
        <div>
          <h3 className="text-lg font-display font-medium text-noir-900">{appointment.referenceNumber}</h3>
          <span
            className="inline-block mt-2 px-3 py-1 text-xs font-medium"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-noir-50 hover:bg-noir-100 transition-colors text-noir-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        {/* Appointment Info */}
        <div className="bg-accent-50 border border-accent-100 p-6 mb-8">
          <h4 className="text-sm font-display font-medium text-accent-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Afspraak
          </h4>
          <div className="text-xl font-display font-medium text-accent-900">
            {formatDate(appointment.appointmentDate)}
          </div>
          <div className="text-accent-700 mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {appointment.appointmentTime}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-ivory-100 p-6 mb-8">
          <h4 className="text-sm font-display font-medium text-noir-900 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-accent-600" />
            Contactgegevens
          </h4>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Naam</div>
              <div className="font-medium text-noir-900 mt-1">{appointment.fullName}</div>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">E-mail</div>
              <a href={`mailto:${appointment.email}`} className="font-medium text-accent-600 mt-1 block hover:text-accent-700 transition-colors">
                {appointment.email}
              </a>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Telefoon</div>
              <a href={`tel:${appointment.phone}`} className="font-medium text-accent-600 mt-1 block hover:text-accent-700 transition-colors">
                {appointment.phone}
              </a>
            </div>
            <div>
              <div className="text-xs text-noir-500 uppercase tracking-wider">Gemeente</div>
              <div className="font-medium text-noir-900 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-noir-400" />
                {appointment.gemeente}
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        {(appointment.projectType || appointment.propertyType || appointment.budget) && (
          <div className="mb-8">
            <h4 className="text-sm font-display font-medium text-noir-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent-600" />
              Projectvoorkeuren
            </h4>
            <div className="space-y-3">
              {appointment.projectType && (
                <div className="flex justify-between items-center py-2 border-b border-noir-100">
                  <span className="text-sm text-noir-500">Project</span>
                  <span className="font-medium text-noir-900">{appointment.projectType}</span>
                </div>
              )}
              {appointment.propertyType && (
                <div className="flex justify-between items-center py-2 border-b border-noir-100">
                  <span className="text-sm text-noir-500">Woning</span>
                  <span className="font-medium text-noir-900">{appointment.propertyType}</span>
                </div>
              )}
              {appointment.budget && (
                <div className="flex justify-between items-center py-2 border-b border-noir-100">
                  <span className="text-sm text-noir-500">Budget</span>
                  <span className="font-medium text-noir-900">{appointment.budget}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message */}
        {appointment.message && (
          <div className="mb-8">
            <h4 className="text-sm font-display font-medium text-noir-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent-600" />
              Bericht
            </h4>
            <div className="p-4 bg-ivory-100 text-sm leading-relaxed text-noir-700">
              {appointment.message}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-noir-100">
          <a
            href={`mailto:${appointment.email}`}
            className="flex-1 py-4 border border-accent-600 bg-white text-accent-600 font-medium text-sm text-center hover:bg-accent-50 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            E-mail sturen
          </a>
          <a
            href={`tel:${appointment.phone}`}
            className="flex-1 py-4 bg-accent-600 text-white font-medium text-sm text-center hover:bg-accent-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Bellen
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
    { id: 'dashboard' as const, icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'quotes' as const, icon: <FileText className="w-5 h-5" />, label: 'Offertes', badge: newQuotes },
    { id: 'appointments' as const, icon: <Calendar className="w-5 h-5" />, label: 'Afspraken', badge: pendingAppointments },
    { id: 'settings' as const, icon: <Settings className="w-5 h-5" />, label: 'Instellingen' },
  ]

  return (
    <div className="flex min-h-screen bg-ivory-100">
      {/* Sidebar */}
      <aside
        className="bg-accent-800 text-white flex flex-col transition-all duration-300 ease-smooth"
        style={{ width: sidebarOpen ? '280px' : '80px' }}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-accent-700/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0">
              <Logo variant="icon" className="w-6 h-6" color="light" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="font-display font-medium text-sm tracking-wider">NAM</div>
                <div className="text-xs text-accent-300 tracking-wider">Admin Portal</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 mb-2 text-sm font-medium transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-accent-600 text-white'
                  : 'text-accent-200 hover:bg-accent-700/50 hover:text-white'
              }`}
              style={{
                padding: sidebarOpen ? '14px 16px' : '14px',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
              {item.badge && item.badge > 0 && sidebarOpen && (
                <span className="ml-auto bg-white text-accent-800 text-xs font-semibold px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-accent-700/50">
          <button
            onClick={handleLogout}
            className="w-full p-3 text-accent-300 hover:bg-accent-700/50 hover:text-white transition-colors text-sm flex items-center gap-3 justify-center"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Uitloggen</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="m-4 p-3 border border-accent-600 text-accent-300 hover:bg-accent-700/50 hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Inklappen</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white px-8 py-6 border-b border-noir-100 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-display font-medium text-noir-900">
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'quotes' && 'Offerteaanvragen'}
              {currentView === 'appointments' && 'Adviesgesprekken'}
              {currentView === 'settings' && 'Instellingen'}
            </h1>
            <p className="text-sm text-noir-500 mt-1">
              {new Date().toLocaleDateString('nl-BE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="w-10 h-10 border border-noir-200 bg-white hover:bg-noir-50 transition-colors flex items-center justify-center text-noir-600"
              title="Vernieuwen"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="relative">
              {(newQuotes + pendingAppointments) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-600 text-white text-xs font-semibold flex items-center justify-center">
                  {newQuotes + pendingAppointments}
                </span>
              )}
              <button className="w-10 h-10 border border-noir-200 bg-white hover:bg-noir-50 transition-colors flex items-center justify-center text-noir-600">
                <Bell className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-noir-600 hover:text-accent-600 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              Website
            </Link>
          </div>
        </header>

        <div className="p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                  title="Offerteaanvragen"
                  value={totalQuotes}
                  subtitle="Totaal"
                  icon={<FileText className="w-5 h-5" />}
                  loading={loading}
                />
                <StatCard
                  title="Nieuwe aanvragen"
                  value={newQuotes}
                  subtitle="Wacht op reactie"
                  icon={<TrendingUp className="w-5 h-5" />}
                  loading={loading}
                  accent
                />
                <StatCard
                  title="Adviesgesprekken"
                  value={totalAppointments}
                  subtitle="Totaal ingepland"
                  icon={<CalendarClock className="w-5 h-5" />}
                  loading={loading}
                />
                <StatCard
                  title="In afwachting"
                  value={pendingAppointments}
                  subtitle="Te bevestigen"
                  icon={<Users className="w-5 h-5" />}
                  loading={loading}
                  accent
                />
              </div>

              {/* Status Overview */}
              {quotes.length > 0 && (
                <div className="bg-white border border-noir-100 p-6 mb-10">
                  <h3 className="text-base font-display font-medium text-noir-900 mb-6">Status overzicht offertes</h3>
                  <div className="flex gap-4 flex-wrap">
                    {(Object.entries(statusConfig) as [QuoteStatus, typeof statusConfig[QuoteStatus]][]).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => { setStatusFilter(key); setCurrentView('quotes') }}
                        className="p-4 px-6 transition-all duration-200 hover:scale-105"
                        style={{ background: config.bg }}
                      >
                        <div className="text-2xl font-display font-medium" style={{ color: config.color }}>
                          {quotesByStatus[key] || 0}
                        </div>
                        <div className="text-xs font-medium mt-1" style={{ color: config.color }}>
                          {config.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Items Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Quotes */}
                <div className="bg-white border border-noir-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-display font-medium text-noir-900">Recente offertes</h3>
                    <button
                      onClick={() => setCurrentView('quotes')}
                      className="px-4 py-2 bg-accent-50 text-accent-700 text-xs font-medium hover:bg-accent-100 transition-colors flex items-center gap-2"
                    >
                      Alles bekijken
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-noir-50 animate-pulse" />
                      ))}
                    </div>
                  ) : quotes.length > 0 ? (
                    <div className="space-y-2">
                      {quotes.slice(0, 5).map(quote => (
                        <div
                          key={quote.id}
                          onClick={() => setSelectedQuote(quote)}
                          className="p-4 hover:bg-ivory-100 cursor-pointer transition-colors border border-transparent hover:border-noir-100"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-noir-900 text-sm">{quote.fullName}</p>
                              <p className="text-xs text-noir-500 mt-0.5">{quote.referenceNumber}</p>
                            </div>
                            <span
                              className="px-2 py-1 text-xs font-medium"
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
                    <p className="text-noir-400 text-center py-12 text-sm">Nog geen offertes</p>
                  )}
                </div>

                {/* Recent Appointments */}
                <div className="bg-white border border-noir-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-display font-medium text-noir-900">Recente afspraken</h3>
                    <button
                      onClick={() => setCurrentView('appointments')}
                      className="px-4 py-2 bg-accent-50 text-accent-700 text-xs font-medium hover:bg-accent-100 transition-colors flex items-center gap-2"
                    >
                      Alles bekijken
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-noir-50 animate-pulse" />
                      ))}
                    </div>
                  ) : appointments.length > 0 ? (
                    <div className="space-y-2">
                      {appointments.slice(0, 5).map(appointment => (
                        <div
                          key={appointment.id}
                          onClick={() => setSelectedAppointment(appointment)}
                          className="p-4 hover:bg-ivory-100 cursor-pointer transition-colors border border-transparent hover:border-noir-100"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-noir-900 text-sm">{appointment.fullName}</p>
                              <p className="text-xs text-noir-500 mt-0.5 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(appointment.appointmentDate).toLocaleDateString('nl-BE')} om {appointment.appointmentTime}
                              </p>
                            </div>
                            <span
                              className="px-2 py-1 text-xs font-medium"
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
                    <p className="text-noir-400 text-center py-12 text-sm">Nog geen afspraken</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Quotes List View */}
          {currentView === 'quotes' && (
            <div className="bg-white border border-noir-100 p-6">
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-accent-600 text-white'
                        : 'border border-noir-200 text-noir-600 hover:bg-noir-50'
                    }`}
                  >
                    Alles ({quotes.length})
                  </button>
                  {(Object.entries(statusConfig).slice(0, 4) as [QuoteStatus, typeof statusConfig[QuoteStatus]][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setStatusFilter(key)}
                      className="px-4 py-2.5 text-xs font-medium transition-colors"
                      style={{
                        background: statusFilter === key ? config.color : config.bg,
                        color: statusFilter === key ? 'white' : config.color
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
                    <div key={i} className="h-20 bg-noir-50 animate-pulse" />
                  ))}
                </div>
              ) : filteredQuotes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-noir-100">
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Referentie</th>
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Klant</th>
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Project</th>
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Status</th>
                        <th className="p-4 text-right text-xs text-noir-500 uppercase tracking-wider font-medium">Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map(quote => (
                        <QuoteRow key={quote.id} quote={quote} onSelect={setSelectedQuote} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 text-noir-400">
                  <FileCheck className="w-12 h-12 mx-auto mb-4 text-noir-300" />
                  <p>Geen aanvragen gevonden</p>
                </div>
              )}
            </div>
          )}

          {/* Appointments List View */}
          {currentView === 'appointments' && (
            <div className="bg-white border border-noir-100 p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-display font-medium text-noir-900">Alle adviesgesprekken</h3>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-20 bg-noir-50 animate-pulse" />
                  ))}
                </div>
              ) : appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-noir-100">
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Referentie</th>
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Klant</th>
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Afspraak</th>
                        <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">Status</th>
                        <th className="p-4 text-right text-xs text-noir-500 uppercase tracking-wider font-medium">Project</th>
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
                </div>
              ) : (
                <div className="text-center py-16 text-noir-400">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-noir-300" />
                  <p>Nog geen afspraken ingepland</p>
                </div>
              )}
            </div>
          )}

          {/* Settings View */}
          {currentView === 'settings' && (
            <div className="bg-white border border-noir-100 p-8">
              <h3 className="text-lg font-display font-medium text-noir-900 mb-6">Instellingen</h3>
              <div className="p-8 bg-ivory-100 text-center">
                <Settings className="w-12 h-12 mx-auto mb-4 text-noir-300" />
                <p className="text-noir-500">Instellingen worden binnenkort toegevoegd.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Quote Detail Sidebar */}
      {selectedQuote && (
        <>
          <div
            onClick={() => setSelectedQuote(null)}
            className="fixed inset-0 bg-noir-900/30 z-40"
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
            className="fixed inset-0 bg-noir-900/30 z-40"
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
