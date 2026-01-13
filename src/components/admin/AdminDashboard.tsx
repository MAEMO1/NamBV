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
  MessageSquare,
  ArrowUpRight,
  Users,
  CalendarClock,
  FileCheck,
  BarChart3,
  FolderOpen,
  Layout,
  Image,
  Check,
  ChevronDown,
  ExternalLink,
  MoreHorizontal,
} from 'lucide-react'
import AnalyticsDashboard from './AnalyticsDashboard'
import ProjectsManager from './ProjectsManager'
import SettingsManager from './SettingsManager'
import ContentManager from './ContentManager'
import MediaLibrary from './MediaLibrary'
import AvailabilityManager from './AvailabilityManager'
import {
  statusConfig,
  budgetRangeLabels,
} from '@/lib/validations/quote'

// Types
type QuoteStatus = keyof typeof statusConfig
type BudgetRange = keyof typeof budgetRangeLabels
type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED' | 'NO_SHOW'

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
  status: AppointmentStatus
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

// Clean status colors
const appointmentStatusConfig: Record<AppointmentStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'In afwachting', color: '#ca8a04', bg: '#fef9c3' },
  CONFIRMED: { label: 'Bevestigd', color: '#16a34a', bg: '#dcfce7' },
  RESCHEDULED: { label: 'Nieuw tijdstip', color: '#ea580c', bg: '#fed7aa' },
  COMPLETED: { label: 'Afgerond', color: '#4f46e5', bg: '#e0e7ff' },
  CANCELLED: { label: 'Geannuleerd', color: '#dc2626', bg: '#fee2e2' },
  REJECTED: { label: 'Geweigerd', color: '#dc2626', bg: '#fee2e2' },
  NO_SHOW: { label: 'Niet verschenen', color: '#71717a', bg: '#f4f4f5' },
}

// Minimal Stat Card
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  loading?: boolean
  highlight?: boolean
  onClick?: () => void
}

function StatCard({ title, value, subtitle, icon, loading, highlight, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${
        highlight
          ? 'bg-accent-600 text-white hover:bg-accent-700'
          : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm'
      }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium mb-2 ${highlight ? 'text-white/70' : 'text-gray-500'}`}>
            {title}
          </p>
          {loading ? (
            <div className={`h-8 w-16 rounded animate-pulse ${highlight ? 'bg-white/20' : 'bg-gray-100'}`} />
          ) : (
            <p className={`text-2xl font-semibold tracking-tight ${highlight ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
          )}
          {subtitle && (
            <p className={`text-xs mt-1 ${highlight ? 'text-white/60' : 'text-gray-400'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          highlight ? 'bg-white/10' : 'bg-gray-50'
        }`}>
          <span className={highlight ? 'text-white/80' : 'text-gray-400'}>
            {icon}
          </span>
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
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' })
  }

  return (
    <tr
      onClick={() => onSelect(quote)}
      className="cursor-pointer hover:bg-gray-50/50 transition-colors group"
    >
      <td className="px-4 py-3.5 border-b border-gray-100">
        <span className="text-sm font-medium text-accent-600">{quote.referenceNumber}</span>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{quote.fullName}</p>
        <p className="text-xs text-gray-500 mt-0.5">{quote.email}</p>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100">
        <p className="text-sm text-gray-700">{quote.services?.slice(0, 2).join(', ')}</p>
        <p className="text-xs text-gray-400 mt-0.5">{quote.postalCode}</p>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100">
        <span
          className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full"
          style={{ background: status?.bg, color: status?.color }}
        >
          {status?.label}
        </span>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100 text-right">
        <span className="text-sm text-gray-600">{formatDate(quote.createdAt)}</span>
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
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' })
  }

  return (
    <tr
      onClick={() => onSelect(appointment)}
      className="cursor-pointer hover:bg-gray-50/50 transition-colors"
    >
      <td className="px-4 py-3.5 border-b border-gray-100">
        <span className="text-sm font-medium text-accent-600">{appointment.referenceNumber}</span>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{appointment.fullName}</p>
        <p className="text-xs text-gray-500 mt-0.5">{appointment.email}</p>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{formatDate(appointment.appointmentDate)}</p>
        <p className="text-xs text-gray-500 mt-0.5">{appointment.appointmentTime} • {appointment.gemeente}</p>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100">
        <span
          className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3.5 border-b border-gray-100 text-right">
        <span className="text-sm text-gray-500">{appointment.projectType || '—'}</span>
      </td>
    </tr>
  )
}

// Quote Detail Panel
interface QuoteDetailProps {
  quote: Quote
  onClose: () => void
}

function QuoteDetail({ quote, onClose }: QuoteDetailProps) {
  const status = statusConfig[quote.status]
  const [currentStatus, setCurrentStatus] = useState(quote.status)

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[440px] bg-white shadow-2xl z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">Offerte</p>
          <h3 className="text-lg font-semibold text-gray-900">{quote.referenceNumber}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Status</label>
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value as QuoteStatus)}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
          >
            {Object.entries(statusConfig).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Contact</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{quote.fullName}</p>
            </div>
            <a href={`mailto:${quote.email}`} className="flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700">
              <Mail className="w-4 h-4" />
              {quote.email}
            </a>
            <a href={`tel:${quote.phone}`} className="flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700">
              <Phone className="w-4 h-4" />
              {quote.phone}
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              {quote.postalCode} {quote.city}
            </div>
          </div>
        </div>

        {/* Project */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Project</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Woningtype</span>
              <span className="text-sm font-medium text-gray-900">{quote.propertyType || '—'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Budget</span>
              <span className="text-sm font-medium text-gray-900">
                {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : '—'}
              </span>
            </div>
          </div>

          {quote.services && quote.services.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Diensten</p>
              <div className="flex flex-wrap gap-2">
                {quote.services.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-accent-50 text-accent-700 text-xs font-medium rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {quote.description && (
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Omschrijving</p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{quote.description}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <a
            href={`mailto:${quote.email}`}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-accent-600 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors text-center"
          >
            E-mail
          </a>
          <a
            href={`tel:${quote.phone}`}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors text-center"
          >
            Bellen
          </a>
        </div>
      </div>
    </div>
  )
}

// Appointment Detail Panel
interface AppointmentDetailProps {
  appointment: Appointment
  onClose: () => void
  onUpdate: () => void
}

function AppointmentDetail({ appointment, onClose, onUpdate }: AppointmentDetailProps) {
  const status = appointmentStatusConfig[appointment.status]
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showReschedule, setShowReschedule] = useState(false)
  const [showReject, setShowReject] = useState(false)
  const [proposedDate, setProposedDate] = useState('')
  const [proposedTime, setProposedTime] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-BE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  const handleAction = async (action: string, data?: Record<string, unknown>) => {
    setActionLoading(action)
    try {
      const response = await fetch(`/api/admin/appointments/${appointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
      })

      if (response.ok) {
        onUpdate()
        onClose()
      } else {
        const error = await response.json()
        alert(error.error || 'Er is een fout opgetreden')
      }
    } catch (error) {
      console.error('Action error:', error)
      alert('Er is een fout opgetreden')
    } finally {
      setActionLoading(null)
    }
  }

  const isPending = appointment.status === 'PENDING'

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[440px] bg-white shadow-2xl z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">Afspraak</p>
          <h3 className="text-lg font-semibold text-gray-900">{appointment.referenceNumber}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Pending Actions */}
        {isPending && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-medium text-amber-800 mb-3">Actie vereist</p>

            {!showReschedule && !showReject && (
              <div className="space-y-2">
                <button
                  onClick={() => handleAction('confirm')}
                  disabled={actionLoading === 'confirm'}
                  className="w-full py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading === 'confirm' ? 'Bezig...' : 'Bevestigen'}
                </button>
                <button
                  onClick={() => setShowReschedule(true)}
                  className="w-full py-2.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Ander tijdstip
                </button>
                <button
                  onClick={() => setShowReject(true)}
                  className="w-full py-2.5 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                >
                  Weigeren
                </button>
              </div>
            )}

            {showReschedule && (
              <div className="space-y-3">
                <input
                  type="date"
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg bg-white"
                />
                <select
                  value={proposedTime}
                  onChange={(e) => setProposedTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg bg-white"
                >
                  <option value="">Kies tijd</option>
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction('reschedule', { proposedDate, proposedTime })}
                    disabled={actionLoading === 'reschedule'}
                    className="flex-1 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg disabled:opacity-50"
                  >
                    Versturen
                  </button>
                  <button
                    onClick={() => setShowReschedule(false)}
                    className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            )}

            {showReject && (
              <div className="space-y-3">
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Reden voor weigering..."
                  className="w-full px-3 py-2 text-sm border border-red-200 rounded-lg bg-white h-20 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction('reject', { rejectionReason })}
                    disabled={actionLoading === 'reject'}
                    className="flex-1 py-2 bg-red-600 text-white text-sm font-medium rounded-lg disabled:opacity-50"
                  >
                    Weigeren
                  </button>
                  <button
                    onClick={() => setShowReject(false)}
                    className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Appointment Info */}
        <div className="bg-accent-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-accent-900">{formatDate(appointment.appointmentDate)}</p>
              <p className="text-sm text-accent-600">{appointment.appointmentTime}</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Contact</h4>
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-900">{appointment.fullName}</p>
            <a href={`mailto:${appointment.email}`} className="flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700">
              <Mail className="w-4 h-4" />
              {appointment.email}
            </a>
            <a href={`tel:${appointment.phone}`} className="flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700">
              <Phone className="w-4 h-4" />
              {appointment.phone}
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              {appointment.gemeente}
            </div>
          </div>
        </div>

        {/* Project Info */}
        {(appointment.projectType || appointment.budget) && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Project</h4>
            <div className="space-y-2">
              {appointment.projectType && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Type</span>
                  <span className="text-sm font-medium text-gray-900">{appointment.projectType}</span>
                </div>
              )}
              {appointment.budget && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Budget</span>
                  <span className="text-sm font-medium text-gray-900">{appointment.budget}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {appointment.message && (
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Bericht</h4>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{appointment.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <a
            href={`mailto:${appointment.email}`}
            className="flex-1 py-2.5 text-sm font-medium text-accent-600 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors text-center"
          >
            E-mail
          </a>
          <a
            href={`https://wa.me/${appointment.phone.replace(/\s/g, '').replace(/^0/, '32')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${appointment.phone}`}
            className="flex-1 py-2.5 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors text-center"
          >
            Bellen
          </a>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard
export default function AdminDashboard() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics' | 'quotes' | 'appointments' | 'projects' | 'content' | 'media' | 'availability' | 'settings'>('dashboard')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all')
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<AppointmentStatus | 'all'>('all')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

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
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analytics' as const, icon: BarChart3, label: 'Analytics' },
    { id: 'quotes' as const, icon: FileText, label: 'Offertes', badge: newQuotes },
    { id: 'appointments' as const, icon: Calendar, label: 'Afspraken', badge: pendingAppointments },
    { id: 'availability' as const, icon: CalendarClock, label: 'Beschikbaarheid' },
    { id: 'projects' as const, icon: FolderOpen, label: 'Projecten' },
    { id: 'content' as const, icon: Layout, label: 'Content' },
    { id: 'media' as const, icon: Image, label: 'Media' },
    { id: 'settings' as const, icon: Settings, label: 'Instellingen' },
  ]

  return (
    <div className={`flex min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <p className="text-sm font-semibold text-gray-900">NAM</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-50 text-accent-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-accent-600' : 'text-gray-400'}`} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-xs font-semibold bg-accent-600 text-white rounded">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {sidebarCollapsed && item.badge && item.badge > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent-600 rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-gray-100 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            {!sidebarCollapsed && <span>Uitloggen</span>}
          </button>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-[18px] h-[18px]" />
            ) : (
              <>
                <ChevronLeft className="w-[18px] h-[18px]" />
                <span>Inklappen</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {currentView !== 'dashboard' && (
              <button
                onClick={() => {
                  setCurrentView('dashboard')
                  setStatusFilter('all')
                  setAppointmentStatusFilter('all')
                }}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                title="Terug naar dashboard"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                {currentView !== 'dashboard' && (
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="text-xs text-gray-400 hover:text-accent-600 transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {currentView !== 'dashboard' && (
                  <span className="text-xs text-gray-300">/</span>
                )}
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentView === 'dashboard' && 'Dashboard'}
                  {currentView === 'analytics' && 'Analytics'}
                  {currentView === 'quotes' && 'Offerteaanvragen'}
                  {currentView === 'appointments' && 'Adviesgesprekken'}
                  {currentView === 'availability' && 'Beschikbaarheid'}
                  {currentView === 'projects' && 'Projecten'}
                  {currentView === 'content' && 'Content'}
                  {currentView === 'media' && 'Media'}
                  {currentView === 'settings' && 'Instellingen'}
                </h1>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date().toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {(newQuotes + pendingAppointments) > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{newQuotes + pendingAppointments}</span>
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-11 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-900">Notificaties</h3>
                      <span className="text-xs text-gray-400">{newQuotes + pendingAppointments} nieuw</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {newQuotes > 0 && quotes.filter(q => q.status === 'NEW').slice(0, 3).map(quote => (
                        <button
                          key={quote.id}
                          onClick={() => {
                            setSelectedQuote(quote)
                            setShowNotifications(false)
                          }}
                          className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-3 text-left border-b border-gray-50"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{quote.fullName}</p>
                            <p className="text-xs text-gray-500">Nieuwe offerte aanvraag</p>
                          </div>
                        </button>
                      ))}
                      {pendingAppointments > 0 && appointments.filter(a => a.status === 'PENDING').slice(0, 3).map(apt => (
                        <button
                          key={apt.id}
                          onClick={() => {
                            setSelectedAppointment(apt)
                            setShowNotifications(false)
                          }}
                          className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-3 text-left border-b border-gray-50"
                        >
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{apt.fullName}</p>
                            <p className="text-xs text-gray-500">Afspraak wacht op bevestiging</p>
                          </div>
                        </button>
                      ))}
                      {(newQuotes + pendingAppointments) === 0 && (
                        <div className="px-4 py-8 text-center">
                          <Bell className="w-8 h-8 mx-auto text-gray-200 mb-2" />
                          <p className="text-sm text-gray-400">Geen nieuwe notificaties</p>
                        </div>
                      )}
                    </div>
                    {(newQuotes + pendingAppointments) > 0 && (
                      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                        <button
                          onClick={() => {
                            setCurrentView(newQuotes > 0 ? 'quotes' : 'appointments')
                            setShowNotifications(false)
                          }}
                          className="w-full text-center text-xs font-medium text-accent-600 hover:text-accent-700"
                        >
                          Bekijk alle
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-accent-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website</span>
            </a>
          </div>
        </header>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Totaal offertes"
                  value={totalQuotes}
                  subtitle="Alle aanvragen"
                  icon={<FileText className="w-5 h-5" />}
                  loading={loading}
                  onClick={() => setCurrentView('quotes')}
                />
                <StatCard
                  title="Nieuwe aanvragen"
                  value={newQuotes}
                  subtitle="Wacht op reactie"
                  icon={<BarChart3 className="w-5 h-5" />}
                  loading={loading}
                  highlight
                  onClick={() => { setStatusFilter('NEW'); setCurrentView('quotes'); }}
                />
                <StatCard
                  title="Afspraken"
                  value={totalAppointments}
                  subtitle="Totaal ingepland"
                  icon={<Calendar className="w-5 h-5" />}
                  loading={loading}
                  onClick={() => setCurrentView('appointments')}
                />
                <StatCard
                  title="Te bevestigen"
                  value={pendingAppointments}
                  subtitle="Actie vereist"
                  icon={<Users className="w-5 h-5" />}
                  loading={loading}
                  highlight
                  onClick={() => { setAppointmentStatusFilter('PENDING'); setCurrentView('appointments'); }}
                />
              </div>

              {/* Recent Items */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Quotes */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Recente offertes</h3>
                    <button
                      onClick={() => setCurrentView('quotes')}
                      className="text-xs font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1"
                    >
                      Bekijk alle <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  {loading ? (
                    <div className="p-4 space-y-3">
                      {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-50 rounded-lg animate-pulse" />)}
                    </div>
                  ) : quotes.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {quotes.slice(0, 5).map((quote) => (
                        <div
                          key={quote.id}
                          onClick={() => setSelectedQuote(quote)}
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium">
                              {quote.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{quote.fullName}</p>
                              <p className="text-xs text-gray-400">{quote.referenceNumber}</p>
                            </div>
                          </div>
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{ background: statusConfig[quote.status]?.bg, color: statusConfig[quote.status]?.color }}
                          >
                            {statusConfig[quote.status]?.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <FileText className="w-8 h-8 mx-auto text-gray-200 mb-2" />
                      <p className="text-sm text-gray-400">Nog geen offertes</p>
                    </div>
                  )}
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Recente afspraken</h3>
                    <button
                      onClick={() => setCurrentView('appointments')}
                      className="text-xs font-medium text-accent-600 hover:text-accent-700 flex items-center gap-1"
                    >
                      Bekijk alle <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  {loading ? (
                    <div className="p-4 space-y-3">
                      {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-50 rounded-lg animate-pulse" />)}
                    </div>
                  ) : appointments.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {appointments.slice(0, 5).map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => setSelectedAppointment(apt)}
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent-50 rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-accent-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{apt.fullName}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(apt.appointmentDate).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' })} • {apt.appointmentTime}
                              </p>
                            </div>
                          </div>
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{ background: appointmentStatusConfig[apt.status].bg, color: appointmentStatusConfig[apt.status].color }}
                          >
                            {appointmentStatusConfig[apt.status].label}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Calendar className="w-8 h-8 mx-auto text-gray-200 mb-2" />
                      <p className="text-sm text-gray-400">Nog geen afspraken</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analytics View */}
          {currentView === 'analytics' && <AnalyticsDashboard />}

          {/* Projects View */}
          {currentView === 'projects' && <ProjectsManager />}

          {/* Content View */}
          {currentView === 'content' && <ContentManager />}

          {/* Media View */}
          {currentView === 'media' && <MediaLibrary />}

          {/* Availability View */}
          {currentView === 'availability' && <AvailabilityManager />}

          {/* Quotes List */}
          {currentView === 'quotes' && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      statusFilter === 'all' ? 'bg-accent-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Alles ({quotes.length})
                  </button>
                  {(Object.entries(statusConfig).slice(0, 4) as [QuoteStatus, typeof statusConfig[QuoteStatus]][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setStatusFilter(key)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
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
                <div className="p-4 space-y-3">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-14 bg-gray-50 rounded animate-pulse" />)}
                </div>
              ) : filteredQuotes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Ref</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Klant</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">Datum</th>
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
                <div className="p-12 text-center">
                  <FileCheck className="w-10 h-10 mx-auto text-gray-200 mb-3" />
                  <p className="text-gray-400">Geen aanvragen gevonden</p>
                </div>
              )}
            </div>
          )}

          {/* Appointments List */}
          {currentView === 'appointments' && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAppointmentStatusFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    appointmentStatusFilter === 'all' ? 'bg-accent-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Alle ({appointments.length})
                </button>
                {(Object.entries(appointmentStatusConfig) as [AppointmentStatus, typeof appointmentStatusConfig[AppointmentStatus]][]).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setAppointmentStatusFilter(key)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors"
                    style={{
                      background: appointmentStatusFilter === key ? config.color : config.bg,
                      color: appointmentStatusFilter === key ? 'white' : config.color
                    }}
                  >
                    {config.label} ({appointments.filter(a => a.status === key).length})
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">
                    {appointmentStatusFilter === 'all' ? 'Alle adviesgesprekken' : `${appointmentStatusConfig[appointmentStatusFilter]?.label || ''} adviesgesprekken`}
                  </h3>
                </div>

                {loading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-14 bg-gray-50 rounded animate-pulse" />)}
                  </div>
                ) : (() => {
                  const filteredAppointments = appointmentStatusFilter === 'all'
                    ? appointments
                    : appointments.filter(a => a.status === appointmentStatusFilter);
                  return filteredAppointments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Ref</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Klant</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Datum</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">Project</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAppointments.map(apt => (
                            <AppointmentRow key={apt.id} appointment={apt} onSelect={setSelectedAppointment} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Calendar className="w-10 h-10 mx-auto text-gray-200 mb-3" />
                      <p className="text-gray-400">Geen afspraken met deze status</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Settings View */}
          {currentView === 'settings' && <SettingsManager />}
        </div>
      </main>

      {/* Detail Panels */}
      {selectedQuote && (
        <>
          <div onClick={() => setSelectedQuote(null)} className="fixed inset-0 bg-black/20 z-40" />
          <QuoteDetail quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
        </>
      )}

      {selectedAppointment && (
        <>
          <div onClick={() => setSelectedAppointment(null)} className="fixed inset-0 bg-black/20 z-40" />
          <AppointmentDetail
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            onUpdate={fetchData}
          />
        </>
      )}
    </div>
  )
}
