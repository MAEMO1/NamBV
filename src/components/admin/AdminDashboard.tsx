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
  BarChart3,
  FolderOpen,
  Download,
  Layout,
  Image,
  Check,
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
const appointmentStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'In afwachting', color: '#b45309', bg: '#fef3c7' },
  CONFIRMED: { label: 'Bevestigd', color: '#047857', bg: '#d1fae5' },
  RESCHEDULED: { label: 'Nieuw tijdstip', color: '#d97706', bg: '#fef3c7' },
  COMPLETED: { label: 'Afgerond', color: '#4338ca', bg: '#e0e7ff' },
  CANCELLED: { label: 'Geannuleerd', color: '#dc2626', bg: '#fee2e2' },
  REJECTED: { label: 'Geweigerd', color: '#dc2626', bg: '#fee2e2' },
  NO_SHOW: { label: 'Niet verschenen', color: '#57534e', bg: '#f5f5f4' },
}

// Stat Card Component - Professional design with subtle animations
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  loading?: boolean
  accent?: boolean
  trend?: { value: number; positive: boolean }
}

function StatCard({ title, value, subtitle, icon, loading, accent, trend }: StatCardProps) {
  return (
    <div
      className={`
        group relative overflow-hidden bg-white border transition-all duration-500
        hover:shadow-lg hover:-translate-y-0.5
        ${accent ? 'border-accent-200 bg-gradient-to-br from-white to-accent-50/30' : 'border-noir-100'}
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[11px] text-noir-400 mb-3 uppercase tracking-[0.15em] font-medium">{title}</p>
            {loading ? (
              <div className="h-10 w-20 bg-noir-100 animate-pulse rounded" />
            ) : (
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-display font-semibold text-noir-900 tracking-tight">{value}</p>
                {trend && (
                  <span className={`text-xs font-medium px-1.5 py-0.5 ${trend.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                    {trend.positive ? '+' : ''}{trend.value}%
                  </span>
                )}
              </div>
            )}
            {subtitle && <p className="text-xs text-noir-400 mt-2">{subtitle}</p>}
          </div>
          <div
            className={`
              w-14 h-14 flex items-center justify-center transition-all duration-300
              group-hover:scale-110 group-hover:rotate-3
              ${accent
                ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25'
                : 'bg-noir-900 text-white'
              }
            `}
          >
            {icon}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 ${accent ? 'bg-accent-500' : 'bg-noir-900'}`} />
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
      month: 'long',
      year: 'numeric'
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

  const handleConfirm = () => handleAction('confirm')
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Vul een reden in')
      return
    }
    handleAction('reject', { rejectionReason })
  }
  const handleReschedule = () => {
    if (!proposedDate || !proposedTime) {
      alert('Vul datum en tijd in')
      return
    }
    handleAction('reschedule', { proposedDate, proposedTime })
  }

  const isPending = appointment.status === 'PENDING'

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
        {/* Admin Actions for Pending Appointments */}
        {isPending && (
          <div className="bg-amber-50 border border-amber-200 p-4 mb-6">
            <h4 className="text-sm font-display font-medium text-amber-800 mb-3">Actie vereist</h4>

            {!showReschedule && !showReject && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleConfirm}
                  disabled={actionLoading === 'confirm'}
                  className="w-full py-3 bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  {actionLoading === 'confirm' ? 'Bezig...' : 'Bevestigen'}
                </button>
                <button
                  onClick={() => setShowReschedule(true)}
                  className="w-full py-3 bg-amber-500 text-white font-medium text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Ander tijdstip voorstellen
                </button>
                <button
                  onClick={() => setShowReject(true)}
                  className="w-full py-3 bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Weigeren
                </button>
              </div>
            )}

            {/* Reschedule Form */}
            {showReschedule && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-amber-700 mb-1">Nieuwe datum</label>
                  <input
                    type="date"
                    value={proposedDate}
                    onChange={(e) => setProposedDate(e.target.value)}
                    className="w-full p-2 border border-amber-300 bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-700 mb-1">Nieuwe tijd</label>
                  <select
                    value={proposedTime}
                    onChange={(e) => setProposedTime(e.target.value)}
                    className="w-full p-2 border border-amber-300 bg-white text-sm"
                  >
                    <option value="">Kies een tijd</option>
                    {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleReschedule}
                    disabled={actionLoading === 'reschedule'}
                    className="flex-1 py-2 bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 disabled:opacity-50"
                  >
                    {actionLoading === 'reschedule' ? 'Bezig...' : 'Versturen'}
                  </button>
                  <button
                    onClick={() => setShowReschedule(false)}
                    className="flex-1 py-2 bg-noir-200 text-noir-700 text-sm font-medium hover:bg-noir-300"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            )}

            {/* Reject Form */}
            {showReject && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-red-700 mb-1">Reden voor weigering *</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Bijv. Dit tijdstip is niet beschikbaar..."
                    className="w-full p-2 border border-red-300 bg-white text-sm h-24"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleReject}
                    disabled={actionLoading === 'reject'}
                    className="flex-1 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                  >
                    {actionLoading === 'reject' ? 'Bezig...' : 'Weigeren'}
                  </button>
                  <button
                    onClick={() => setShowReject(false)}
                    className="flex-1 py-2 bg-noir-200 text-noir-700 text-sm font-medium hover:bg-noir-300"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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

        {/* Contact Actions */}
        <div className="flex gap-3 pt-6 border-t border-noir-100">
          <a
            href={`mailto:${appointment.email}`}
            className="flex-1 py-4 border border-accent-600 bg-white text-accent-600 font-medium text-sm text-center hover:bg-accent-50 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            E-mail sturen
          </a>
          <a
            href={`https://wa.me/${appointment.phone.replace(/\s/g, '').replace(/^0/, '32')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 bg-green-600 text-white font-medium text-sm text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
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
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics' | 'quotes' | 'appointments' | 'projects' | 'content' | 'media' | 'availability' | 'settings'>('dashboard')
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
    { id: 'analytics' as const, icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { id: 'quotes' as const, icon: <FileText className="w-5 h-5" />, label: 'Offertes', badge: newQuotes },
    { id: 'appointments' as const, icon: <Calendar className="w-5 h-5" />, label: 'Afspraken', badge: pendingAppointments },
    { id: 'availability' as const, icon: <CalendarClock className="w-5 h-5" />, label: 'Beschikbaarheid' },
    { id: 'projects' as const, icon: <FolderOpen className="w-5 h-5" />, label: 'Projecten' },
    { id: 'content' as const, icon: <Layout className="w-5 h-5" />, label: 'Content' },
    { id: 'media' as const, icon: <Image className="w-5 h-5" />, label: 'Media' },
    { id: 'settings' as const, icon: <Settings className="w-5 h-5" />, label: 'Instellingen' },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-ivory-50 to-ivory-100">
      {/* Sidebar - Modern dark design */}
      <aside
        className="bg-noir-950 text-white flex flex-col transition-all duration-500 ease-out relative overflow-hidden"
        style={{ width: sidebarOpen ? '280px' : '80px' }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDBWNDBIMHoiLz48cGF0aCBkPSJNMCAwaDFWMUgweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-50" />

        {/* Logo Area */}
        <div className="relative p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-500/30">
              <Logo variant="icon" className="w-6 h-6" color="light" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="font-display font-semibold text-sm tracking-[0.15em] text-white">NAM</div>
                <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase mt-0.5">Admin Portal</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative p-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map(item => {
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    w-full flex items-center gap-3 text-sm font-medium transition-all duration-300 relative group
                    ${isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:bg-white/5 hover:text-white/90'
                    }
                  `}
                  style={{
                    padding: sidebarOpen ? '14px 16px' : '14px',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center'
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-500 rounded-r" />
                  )}
                  <span className={`transition-transform duration-300 ${isActive ? 'text-accent-400' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  {sidebarOpen && <span className="tracking-wide">{item.label}</span>}
                  {item.badge && item.badge > 0 && sidebarOpen && (
                    <span className="ml-auto bg-accent-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                      {item.badge}
                    </span>
                  )}
                  {item.badge && item.badge > 0 && !sidebarOpen && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="relative p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full p-3 text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-sm flex items-center gap-3 justify-center group"
          >
            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {sidebarOpen && <span>Uitloggen</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative m-4 p-3 border border-white/10 text-white/40 hover:bg-white/5 hover:text-white/80 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider">Inklappen</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header - Clean, modern design */}
        <header className="bg-white/80 backdrop-blur-sm px-8 py-5 border-b border-noir-100/50 flex justify-between items-center sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-display font-semibold text-noir-900 tracking-tight">
                {currentView === 'dashboard' && 'Dashboard'}
                {currentView === 'analytics' && 'Analytics'}
                {currentView === 'quotes' && 'Offerteaanvragen'}
                {currentView === 'appointments' && 'Adviesgesprekken'}
                {currentView === 'availability' && 'Beschikbaarheid'}
                {currentView === 'projects' && 'Projecten'}
                {currentView === 'content' && 'Content Beheer'}
                {currentView === 'media' && 'Media Bibliotheek'}
                {currentView === 'settings' && 'Instellingen'}
              </h1>
              {(newQuotes + pendingAppointments) > 0 && (
                <span className="px-2 py-0.5 bg-accent-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                  {newQuotes + pendingAppointments} nieuw
                </span>
              )}
            </div>
            <p className="text-xs text-noir-400 mt-1 tracking-wide">
              {new Date().toLocaleDateString('nl-BE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="w-9 h-9 border border-noir-200/50 bg-white hover:bg-noir-50 hover:border-noir-300 transition-all duration-300 flex items-center justify-center text-noir-500 hover:text-noir-700 rounded-sm group"
              title="Vernieuwen"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
            <button className="w-9 h-9 border border-noir-200/50 bg-white hover:bg-noir-50 hover:border-noir-300 transition-all duration-300 flex items-center justify-center text-noir-500 hover:text-noir-700 rounded-sm relative">
              <Bell className="w-4 h-4" />
              {(newQuotes + pendingAppointments) > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">{newQuotes + pendingAppointments}</span>
                </span>
              )}
            </button>
            <div className="w-px h-6 bg-noir-200 mx-2" />
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-noir-500 hover:text-accent-600 transition-colors uppercase tracking-wider"
            >
              <ArrowUpRight className="w-3 h-3" />
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
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-display font-semibold text-noir-900 tracking-tight">
                  Welkom terug
                </h2>
                <p className="text-noir-400 text-sm mt-1">
                  Hier is een overzicht van uw bedrijfsactiviteiten
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard
                  title="Offerteaanvragen"
                  value={totalQuotes}
                  subtitle="Totaal ontvangen"
                  icon={<FileText className="w-5 h-5" />}
                  loading={loading}
                />
                <StatCard
                  title="Nieuwe aanvragen"
                  value={newQuotes}
                  subtitle="Wachten op reactie"
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
                  title="Te bevestigen"
                  value={pendingAppointments}
                  subtitle="Actie vereist"
                  icon={<Users className="w-5 h-5" />}
                  loading={loading}
                  accent
                />
              </div>

              {/* Status Overview */}
              {quotes.length > 0 && (
                <div className="bg-white border border-noir-100 p-6 mb-10 group hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-display font-semibold text-noir-900 uppercase tracking-wider">Status overzicht</h3>
                    <span className="text-xs text-noir-400">Klik om te filteren</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {(Object.entries(statusConfig) as [QuoteStatus, typeof statusConfig[QuoteStatus]][]).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => { setStatusFilter(key); setCurrentView('quotes') }}
                        className="p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md text-center group/item"
                        style={{ background: config.bg }}
                      >
                        <div className="text-3xl font-display font-bold transition-transform duration-300 group-hover/item:scale-110" style={{ color: config.color }}>
                          {quotesByStatus[key] || 0}
                        </div>
                        <div className="text-[10px] font-semibold mt-2 uppercase tracking-wider" style={{ color: config.color }}>
                          {config.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Items Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Quotes */}
                <div className="bg-white border border-noir-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center p-5 border-b border-noir-100/50 bg-noir-50/30">
                    <h3 className="text-sm font-display font-semibold text-noir-900 uppercase tracking-wider">Recente offertes</h3>
                    <button
                      onClick={() => setCurrentView('quotes')}
                      className="px-3 py-1.5 text-accent-600 text-xs font-semibold hover:bg-accent-50 transition-colors flex items-center gap-1.5 rounded-sm"
                    >
                      Bekijk alle
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-2">
                    {loading ? (
                      <div className="space-y-2 p-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-14 bg-noir-50 animate-pulse rounded" />
                        ))}
                      </div>
                    ) : quotes.length > 0 ? (
                      <div className="divide-y divide-noir-100/50">
                        {quotes.slice(0, 5).map((quote, index) => (
                          <div
                            key={quote.id}
                            onClick={() => setSelectedQuote(quote)}
                            className="p-4 hover:bg-accent-50/30 cursor-pointer transition-all duration-200 flex items-center justify-between group/item"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-noir-100 flex items-center justify-center text-noir-500 font-display font-semibold text-sm group-hover/item:bg-accent-500 group-hover/item:text-white transition-colors">
                                {quote.fullName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-noir-900 text-sm group-hover/item:text-accent-700 transition-colors">{quote.fullName}</p>
                                <p className="text-[11px] text-noir-400 mt-0.5 font-mono">{quote.referenceNumber}</p>
                              </div>
                            </div>
                            <span
                              className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                              style={{
                                background: statusConfig[quote.status]?.bg,
                                color: statusConfig[quote.status]?.color
                              }}
                            >
                              {statusConfig[quote.status]?.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-10 h-10 mx-auto text-noir-200 mb-3" />
                        <p className="text-noir-400 text-sm">Nog geen offertes</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Appointments */}
                <div className="bg-white border border-noir-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center p-5 border-b border-noir-100/50 bg-noir-50/30">
                    <h3 className="text-sm font-display font-semibold text-noir-900 uppercase tracking-wider">Recente afspraken</h3>
                    <button
                      onClick={() => setCurrentView('appointments')}
                      className="px-3 py-1.5 text-accent-600 text-xs font-semibold hover:bg-accent-50 transition-colors flex items-center gap-1.5 rounded-sm"
                    >
                      Bekijk alle
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-2">
                    {loading ? (
                      <div className="space-y-2 p-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-14 bg-noir-50 animate-pulse rounded" />
                        ))}
                      </div>
                    ) : appointments.length > 0 ? (
                      <div className="divide-y divide-noir-100/50">
                        {appointments.slice(0, 5).map((appointment, index) => (
                          <div
                            key={appointment.id}
                            onClick={() => setSelectedAppointment(appointment)}
                            className="p-4 hover:bg-accent-50/30 cursor-pointer transition-all duration-200 flex items-center justify-between group/item"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-accent-100 flex items-center justify-center text-accent-600 group-hover/item:bg-accent-500 group-hover/item:text-white transition-colors">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-medium text-noir-900 text-sm group-hover/item:text-accent-700 transition-colors">{appointment.fullName}</p>
                                <p className="text-[11px] text-noir-400 mt-0.5 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(appointment.appointmentDate).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' })} • {appointment.appointmentTime}
                                </p>
                              </div>
                            </div>
                            <span
                              className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                              style={{
                                background: appointmentStatusConfig[appointment.status].bg,
                                color: appointmentStatusConfig[appointment.status].color
                              }}
                            >
                              {appointmentStatusConfig[appointment.status].label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="w-10 h-10 mx-auto text-noir-200 mb-3" />
                        <p className="text-noir-400 text-sm">Nog geen afspraken</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Analytics View */}
          {currentView === 'analytics' && (
            <AnalyticsDashboard />
          )}

          {/* Projects View */}
          {currentView === 'projects' && (
            <ProjectsManager />
          )}

          {/* Content View */}
          {currentView === 'content' && (
            <ContentManager />
          )}

          {/* Media View */}
          {currentView === 'media' && (
            <MediaLibrary />
          )}

          {/* Availability View */}
          {currentView === 'availability' && (
            <AvailabilityManager />
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
            <SettingsManager />
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
            onUpdate={fetchData}
          />
        </>
      )}
    </div>
  )
}
