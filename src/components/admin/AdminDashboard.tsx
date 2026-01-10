'use client'

import { useState, useMemo } from 'react'
import {
  statusConfig,
  budgetRangeLabels,
  type QuoteRequestInput
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
  description: string
  budgetRange?: BudgetRange
  createdAt: string
  assignedTo?: string | null
}

interface User {
  name: string
  email: string
  role: 'superadmin' | 'admin'
  active: boolean
}

// Mock data
const mockQuotes: Quote[] = [
  {
    id: '1',
    referenceNumber: 'NAM-2026-0042',
    status: 'NEW',
    fullName: 'Jan Peeters',
    email: 'jan.peeters@gmail.com',
    phone: '0493 12 34 56',
    postalCode: '9000',
    city: 'Gent',
    propertyType: 'Herenhuis',
    services: ['Totaalrenovatie', 'Elektriciteit'],
    description: 'Volledige renovatie van een herenhuis uit 1920. Drie verdiepingen, inclusief nieuwe elektriciteit en sanitair.',
    budgetRange: 'RANGE_50K_100K',
    createdAt: '2026-01-10T09:23:00',
    assignedTo: null,
  },
  {
    id: '2',
    referenceNumber: 'NAM-2026-0041',
    status: 'CONTACTED',
    fullName: 'Marie Vandenberghe',
    email: 'marie.vdb@hotmail.com',
    phone: '0476 98 76 54',
    postalCode: '9030',
    city: 'Mariakerke',
    propertyType: 'Tussenwoning',
    services: ['Badkamer', 'Toilet'],
    description: 'Badkamer en toilet renoveren. Huidige staat is verouderd (jaren 90).',
    budgetRange: 'RANGE_10K_25K',
    createdAt: '2026-01-09T14:45:00',
    assignedTo: 'Ahmed',
  },
  {
    id: '3',
    referenceNumber: 'NAM-2026-0040',
    status: 'SITE_VISIT',
    fullName: 'Peter De Smedt',
    email: 'peter.desmedt@werk.be',
    phone: '0489 11 22 33',
    postalCode: '9000',
    city: 'Gent',
    propertyType: 'Appartement',
    services: ['Keuken'],
    description: 'Nieuwe keuken plaatsen in appartement. Ruimte is 12m².',
    budgetRange: 'RANGE_25K_50K',
    createdAt: '2026-01-08T11:30:00',
    assignedTo: 'Ahmed',
  },
  {
    id: '4',
    referenceNumber: 'NAM-2026-0039',
    status: 'QUOTE_SENT',
    fullName: 'Familie Claessens',
    email: 'claessens.familie@telenet.be',
    phone: '0477 44 55 66',
    postalCode: '9050',
    city: 'Ledeberg',
    propertyType: 'Rijwoning',
    services: ['Vloeren', 'Schilderwerk'],
    description: 'Alle vloeren vervangen (80m²) en volledige woning schilderen.',
    budgetRange: 'RANGE_25K_50K',
    createdAt: '2026-01-07T16:20:00',
    assignedTo: 'Ahmed',
  },
  {
    id: '5',
    referenceNumber: 'NAM-2026-0038',
    status: 'WON',
    fullName: 'Sofie Martens',
    email: 'sofie.m@outlook.com',
    phone: '0468 77 88 99',
    postalCode: '9000',
    city: 'Gent',
    propertyType: 'Hoekwoning',
    services: ['Totaalrenovatie'],
    description: 'Complete renovatie hoekwoning, 3 slaapkamers, 2 badkamers.',
    budgetRange: 'OVER_100K',
    createdAt: '2026-01-05T10:00:00',
    assignedTo: 'Ahmed',
  },
  {
    id: '6',
    referenceNumber: 'NAM-2026-0037',
    status: 'LOST',
    fullName: 'Thomas Willems',
    email: 'twillems@gmail.com',
    phone: '0495 33 22 11',
    postalCode: '9040',
    city: 'Sint-Amandsberg',
    propertyType: 'Appartement',
    services: ['Badkamer'],
    description: 'Kleine badkamerrenovatie.',
    budgetRange: 'UNDER_10K',
    createdAt: '2026-01-03T13:15:00',
    assignedTo: null,
  },
]

const mockUsers: User[] = [
  { name: 'Ahmed (jij)', email: 'ahmed@namconstruction.be', role: 'superadmin', active: true },
  { name: 'Sara', email: 'sara@namconstruction.be', role: 'admin', active: true },
  { name: 'Karim', email: 'karim@namconstruction.be', role: 'admin', active: false },
]

const servicesList = [
  'Totaalrenovatie', 'Badkamer', 'Keuken', 'Toilet', 'Woonkamer',
  'Elektriciteit', 'Sanitair', 'Vloeren', 'Schilderwerk'
]

// Components
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  trend?: number
}

function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${NAM_TEAL}15` }}
        >
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div
          className="mt-3 pt-3 border-t border-gray-100 text-xs"
          style={{ color: trend > 0 ? '#10b981' : '#ef4444' }}
        >
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs vorige week
        </div>
      )}
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
        <div className="text-sm text-gray-900">{quote.services.join(', ')}</div>
        <div className="text-sm text-gray-500">{quote.propertyType} • {quote.postalCode}</div>
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
        <span className="text-sm font-medium text-gray-900">
          {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : '—'}
        </span>
      </td>
    </tr>
  )
}

interface QuoteDetailProps {
  quote: Quote
  onClose: () => void
  userRole: 'admin' | 'superadmin'
}

function QuoteDetail({ quote, onClose, userRole }: QuoteDetailProps) {
  const status = statusConfig[quote.status]
  const [currentStatus, setCurrentStatus] = useState(quote.status)

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[500px] bg-white shadow-2xl z-50 overflow-auto">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{quote.referenceNumber}</h3>
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
        {/* Status Update - Fixed: use value + onChange instead of selected attribute */}
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

        {/* Contact Info */}
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

        {/* Project Info */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Projectdetails</h4>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Type woning</div>
            <div className="font-medium">{quote.propertyType}</div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Diensten</div>
            <div className="flex gap-1.5 flex-wrap">
              {quote.services.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md text-xs font-medium"
                  style={{ background: `${NAM_TEAL}15`, color: NAM_TEAL }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Budget</div>
            <div className="font-medium">
              {quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : 'Niet opgegeven'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Omschrijving</div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm leading-relaxed">
              {quote.description}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Notities</h4>
          <textarea
            placeholder="Voeg een notitie toe..."
            rows={3}
            className="w-full p-3 rounded-lg border-2 border-gray-200 text-sm resize-y"
          />
          <button
            className="mt-2 px-4 py-2.5 rounded-lg border-none text-white text-xs font-medium cursor-pointer"
            style={{ background: NAM_TEAL }}
          >
            Notitie opslaan
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <button
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
            style={{ border: `2px solid ${NAM_TEAL}`, background: 'white', color: NAM_TEAL }}
          >
            ✉️ E-mail sturen
          </button>
          <button
            className="flex-1 py-3.5 rounded-xl border-none text-white font-semibold text-sm cursor-pointer"
            style={{ background: '#10b981' }}
          >
            📞 Bellen
          </button>
        </div>

        {/* Delete (superadmin only) */}
        {userRole === 'superadmin' && (
          <button
            className="w-full mt-4 py-3 rounded-lg text-xs font-medium cursor-pointer"
            style={{ border: '2px solid #fecaca', background: '#fef2f2', color: '#dc2626' }}
          >
            🗑️ Aanvraag verwijderen
          </button>
        )}
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'quotes' | 'services' | 'users' | 'settings'>('dashboard')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all')
  const [userRole] = useState<'admin' | 'superadmin'>('superadmin')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Analytics calculations
  const totalQuotes = mockQuotes.length
  const newQuotes = mockQuotes.filter(q => q.status === 'NEW').length
  const wonQuotes = mockQuotes.filter(q => q.status === 'WON').length
  const conversionRate = ((wonQuotes / totalQuotes) * 100).toFixed(1)

  const quotesByStatus = useMemo(() => {
    return (Object.keys(statusConfig) as QuoteStatus[]).reduce((acc, status) => {
      acc[status] = mockQuotes.filter(q => q.status === status).length
      return acc
    }, {} as Record<QuoteStatus, number>)
  }, [])

  const filteredQuotes = statusFilter === 'all'
    ? mockQuotes
    : mockQuotes.filter(q => q.status === statusFilter)

  const navItems = [
    { id: 'dashboard' as const, icon: '📊', label: 'Dashboard' },
    { id: 'quotes' as const, icon: '📋', label: 'Offertes' },
    ...(userRole === 'superadmin' ? [
      { id: 'services' as const, icon: '🔧', label: 'Rubrieken' },
      { id: 'users' as const, icon: '👥', label: 'Gebruikers' },
    ] : []),
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
              <div className="text-xs text-gray-400">
                {userRole === 'superadmin' ? 'Superadmin' : 'Admin'}
              </div>
            </div>
          )}
        </div>

        <nav className="p-3 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className="w-full rounded-xl border-none text-white text-sm font-medium cursor-pointer flex items-center gap-3 mb-1"
              style={{
                padding: sidebarOpen ? '12px 16px' : '12px',
                background: currentView === item.id ? NAM_TEAL : 'transparent',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

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
              {currentView === 'services' && 'Rubrieken beheren'}
              {currentView === 'users' && 'Gebruikersbeheer'}
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
            <div className="relative">
              {newQuotes > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center">
                  {newQuotes}
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
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard title="Totaal aanvragen" value={totalQuotes} subtitle="Alle tijd" icon="📈" />
                <StatCard title="Nieuwe aanvragen" value={newQuotes} subtitle="Wacht op reactie" icon="📬" trend={12} />
                <StatCard title="Conversieratio" value={`${conversionRate}%`} subtitle="Aanvraag → klant" icon="📊" trend={5} />
                <StatCard title="Gewonnen" value={wonQuotes} subtitle="Deze maand" icon="🏆" />
              </div>

              {/* Status Overview */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                <h3 className="text-base font-semibold mb-5">Status overzicht</h3>
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

              {/* Recent Quotes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-base font-semibold">Recente aanvragen</h3>
                  <button
                    onClick={() => setCurrentView('quotes')}
                    className="px-4 py-2 rounded-lg border-none text-xs font-medium cursor-pointer"
                    style={{ background: `${NAM_TEAL}15`, color: NAM_TEAL }}
                  >
                    Alles bekijken →
                  </button>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ref</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Klant</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="p-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-3 text-right text-xs text-gray-500 uppercase tracking-wider">Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockQuotes.slice(0, 5).map(quote => (
                      <QuoteRow key={quote.id} quote={quote} onSelect={setSelectedQuote} />
                    ))}
                  </tbody>
                </table>
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
                    Alles ({mockQuotes.length})
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
                <input
                  type="search"
                  placeholder="Zoeken..."
                  className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm w-48"
                />
              </div>

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

              {filteredQuotes.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  Geen aanvragen gevonden
                </div>
              )}
            </div>
          )}

          {/* Services Management (Superadmin only) */}
          {currentView === 'services' && userRole === 'superadmin' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold">Diensten / Rubrieken</h3>
                <button
                  className="px-5 py-2.5 rounded-lg border-none text-white text-sm font-medium cursor-pointer"
                  style={{ background: NAM_TEAL }}
                >
                  + Nieuwe rubriek
                </button>
              </div>

              <div className="grid gap-3">
                {servicesList.map((service) => (
                  <div
                    key={service}
                    className="flex justify-between items-center p-4 px-5 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="cursor-grab text-gray-400">⠿</span>
                      <span className="font-medium">{service}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 rounded-md border border-gray-200 bg-white text-xs cursor-pointer">
                        ✏️ Bewerken
                      </button>
                      <button
                        className="px-3 py-2 rounded-md text-xs cursor-pointer"
                        style={{ border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Management (Superadmin only) */}
          {currentView === 'users' && userRole === 'superadmin' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold">Gebruikers</h3>
                <button
                  className="px-5 py-2.5 rounded-lg border-none text-white text-sm font-medium cursor-pointer"
                  style={{ background: NAM_TEAL }}
                >
                  + Nieuwe gebruiker
                </button>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="p-3 text-left text-xs text-gray-500 uppercase">Gebruiker</th>
                    <th className="p-3 text-left text-xs text-gray-500 uppercase">E-mail</th>
                    <th className="p-3 text-left text-xs text-gray-500 uppercase">Rol</th>
                    <th className="p-3 text-left text-xs text-gray-500 uppercase">Status</th>
                    <th className="p-3 text-right text-xs text-gray-500 uppercase">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.email} className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full text-white flex items-center justify-center font-semibold text-sm"
                            style={{ background: user.role === 'superadmin' ? NAM_GOLD : NAM_TEAL }}
                          >
                            {user.name[0]}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500">{user.email}</td>
                      <td className="p-4">
                        <span
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{
                            background: user.role === 'superadmin' ? `${NAM_GOLD}20` : `${NAM_TEAL}20`,
                            color: user.role === 'superadmin' ? NAM_GOLD : NAM_TEAL
                          }}
                        >
                          {user.role === 'superadmin' ? 'Superadmin' : 'Admin'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{
                            background: user.active ? '#ecfdf5' : '#f3f4f6',
                            color: user.active ? '#10b981' : '#6b7280'
                          }}
                        >
                          {user.active ? 'Actief' : 'Inactief'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="px-3 py-2 rounded-md border border-gray-200 bg-white text-xs cursor-pointer mr-2">
                          ✏️
                        </button>
                        {user.role !== 'superadmin' && (
                          <button
                            className="px-3 py-2 rounded-md text-xs cursor-pointer"
                            style={{ border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626' }}
                          >
                            🗑️
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            userRole={userRole}
          />
        </>
      )}
    </div>
  )
}
