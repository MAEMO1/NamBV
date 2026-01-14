'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  Building2,
  Wrench,
  Wallet,
  MapPin,
  Leaf,
  Target,
  TrendingUp,
  FileCheck,
  Euro,
  Users,
  PieChart,
  RefreshCw,
} from 'lucide-react'

interface DataItem {
  label: string
  count: number
}

interface InterestData {
  count: number
  percentage: number
  total: number
}

interface InsightsData {
  totals: {
    quotes: number
    appointments: number
    total: number
  }
  quotes: {
    propertyTypes: DataItem[]
    serviceTypes: DataItem[]
    budgetRanges: DataItem[]
    postalCodeRegions: DataItem[]
  }
  appointments: {
    projectTypes: DataItem[]
    propertyTypes: DataItem[]
    propertyAges: DataItem[]
    budgets: DataItem[]
    priorities: DataItem[]
    materials: DataItem[]
    motivations: DataItem[]
    gemeentes: DataItem[]
    subsidyInterest: InterestData
    paymentSpread: InterestData
  }
  combined: {
    propertyTypes: DataItem[]
    budgets: DataItem[]
  }
}

// Label mappings for better display
const budgetLabels: Record<string, string> = {
  UNDER_10K: '< €10.000',
  RANGE_10K_25K: '€10.000 - €25.000',
  RANGE_25K_50K: '€25.000 - €50.000',
  RANGE_50K_100K: '€50.000 - €100.000',
  OVER_100K: '> €100.000',
  UNKNOWN: 'Onbekend',
  'under-10k': '< €10.000',
  '10k-25k': '€10.000 - €25.000',
  '25k-50k': '€25.000 - €50.000',
  '50k-100k': '€50.000 - €100.000',
  'over-100k': '> €100.000',
  'no-idea': 'Nog geen idee',
}

const projectTypeLabels: Record<string, string> = {
  'total-renovation': 'Totaalrenovatie',
  'partial-renovation': 'Gedeeltelijke renovatie',
  bathroom: 'Badkamer',
  kitchen: 'Keuken',
  painting: 'Schilderwerken',
  electricity: 'Elektriciteit',
}

const propertyTypeLabels: Record<string, string> = {
  house: 'Woning',
  apartment: 'Appartement',
  commercial: 'Commercieel',
  'new-build': 'Nieuwbouw',
  other: 'Andere',
}

const propertyAgeLabels: Record<string, string> = {
  'under-10': '< 10 jaar',
  '10-30': '10-30 jaar',
  '30-50': '30-50 jaar',
  'over-50': '> 50 jaar',
  unknown: 'Onbekend',
}

const priorityLabels: Record<string, string> = {
  eco: 'Ecologie',
  recycling: 'Hergebruik',
  energy: 'Energie',
  comfort: 'Comfort',
  design: 'Design',
  cost: 'Kosten',
}

const materialLabels: Record<string, string> = {
  natural: 'Natuurlijk',
  recycled: 'Gerecycleerd',
  standard: 'Standaard',
  'no-preference': 'Geen voorkeur',
}

const motivationLabels: Record<string, string> = {
  'value-increase': 'Waardestijging',
  'comfort-improvement': 'Comfort verbetering',
  'energy-savings': 'Energiebesparing',
  repairs: 'Herstellingen nodig',
  'family-change': 'Gezinswijziging',
  other: 'Andere',
}

const postalCodeRegions: Record<string, string> = {
  '10': 'Brussel',
  '11': 'Brussel',
  '12': 'Brussel',
  '13': 'Waals-Brabant',
  '14': 'Waals-Brabant',
  '15': 'Vlaams-Brabant',
  '16': 'Vlaams-Brabant',
  '17': 'Vlaams-Brabant',
  '18': 'Vlaams-Brabant',
  '19': 'Vlaams-Brabant',
  '20': 'Antwerpen',
  '21': 'Antwerpen',
  '22': 'Antwerpen',
  '23': 'Antwerpen',
  '24': 'Antwerpen',
  '25': 'Antwerpen',
  '26': 'Antwerpen',
  '27': 'Antwerpen',
  '28': 'Antwerpen',
  '29': 'Antwerpen',
  '30': 'Limburg',
  '31': 'Limburg',
  '32': 'Limburg',
  '33': 'Limburg',
  '34': 'Limburg',
  '35': 'Limburg',
  '36': 'Limburg',
  '37': 'Limburg',
  '38': 'Limburg',
  '39': 'Limburg',
  '40': 'Luik',
  '41': 'Luik',
  '42': 'Luik',
  '43': 'Luik',
  '44': 'Luik',
  '45': 'Luik',
  '46': 'Luik',
  '47': 'Luik',
  '48': 'Luik',
  '49': 'Luik',
  '50': 'Namen',
  '51': 'Namen',
  '52': 'Namen',
  '53': 'Namen',
  '54': 'Namen',
  '55': 'Namen',
  '56': 'Henegouwen',
  '57': 'Henegouwen',
  '60': 'Henegouwen',
  '61': 'Henegouwen',
  '62': 'Henegouwen',
  '63': 'Henegouwen',
  '64': 'Henegouwen',
  '65': 'Henegouwen',
  '66': 'Luxemburg',
  '67': 'Luxemburg',
  '68': 'Luxemburg',
  '69': 'Luxemburg',
  '70': 'Henegouwen',
  '71': 'Henegouwen',
  '72': 'Henegouwen',
  '73': 'Henegouwen',
  '74': 'Henegouwen',
  '75': 'Henegouwen',
  '76': 'Henegouwen',
  '77': 'Henegouwen',
  '78': 'West-Vlaanderen',
  '79': 'West-Vlaanderen',
  '80': 'West-Vlaanderen',
  '81': 'West-Vlaanderen',
  '82': 'West-Vlaanderen',
  '83': 'West-Vlaanderen',
  '84': 'West-Vlaanderen',
  '85': 'West-Vlaanderen',
  '86': 'West-Vlaanderen',
  '87': 'West-Vlaanderen',
  '88': 'West-Vlaanderen',
  '89': 'West-Vlaanderen',
  '90': 'Oost-Vlaanderen',
  '91': 'Oost-Vlaanderen',
  '92': 'Oost-Vlaanderen',
  '93': 'Oost-Vlaanderen',
  '94': 'Oost-Vlaanderen',
  '95': 'Oost-Vlaanderen',
  '96': 'Oost-Vlaanderen',
  '97': 'Oost-Vlaanderen',
  '98': 'Oost-Vlaanderen',
  '99': 'Oost-Vlaanderen',
}

// Bar Chart Component
function BarChart({ data, labelMap, maxItems = 10, color = 'accent' }: {
  data: DataItem[]
  labelMap?: Record<string, string>
  maxItems?: number
  color?: 'accent' | 'blue' | 'green' | 'amber'
}) {
  const displayData = data.slice(0, maxItems)
  const maxCount = Math.max(...displayData.map(d => d.count), 1)

  const colorClasses = {
    accent: 'bg-accent-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
  }

  return (
    <div className="space-y-2">
      {displayData.map((item, idx) => {
        const label = labelMap?.[item.label] || item.label
        const percentage = (item.count / maxCount) * 100

        return (
          <div key={idx} className="group">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-700 truncate flex-1 mr-2">{label}</span>
              <span className="text-gray-500 font-medium flex-shrink-0">{item.count}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
      {data.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">Geen data beschikbaar</p>
      )}
    </div>
  )
}

// Percentage Ring Component
function PercentageRing({ percentage, label, count, total }: {
  percentage: number
  label: string
  count: number
  total: number
}) {
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-100"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-accent-500 transition-all duration-700"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-900">{percentage}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{count} van {total}</p>
      </div>
    </div>
  )
}

// Stat Card
function InsightCard({
  title,
  icon,
  children,
  className = ''
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-4 sm:p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function InsightsManager() {
  const [data, setData] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'appointments'>('overview')

  const fetchInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/insights')
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-gray-50 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-400">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>Kon inzichten niet laden</p>
      </div>
    )
  }

  // Process postal code regions for better display
  const regionData = data.quotes.postalCodeRegions.reduce((acc, item) => {
    const region = postalCodeRegions[item.label] || 'Onbekend'
    acc[region] = (acc[region] || 0) + item.count
    return acc
  }, {} as Record<string, number>)

  const regionArray = Object.entries(regionData)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)

  const tabs = [
    { id: 'overview' as const, label: 'Overzicht' },
    { id: 'quotes' as const, label: 'Offertes' },
    { id: 'appointments' as const, label: 'Afspraken' },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="bg-white rounded-xl border border-gray-100 p-1.5 inline-flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={fetchInsights}
          className="self-end sm:self-auto w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{data.totals.total}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Totaal aanvragen</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl sm:text-3xl font-semibold text-accent-600">{data.totals.quotes}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Offertes</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl sm:text-3xl font-semibold text-blue-600">{data.totals.appointments}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Afspraken</p>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <InsightCard title="Type woning (totaal)" icon={<Building2 className="w-4 h-4" />}>
            <BarChart data={data.combined.propertyTypes} labelMap={propertyTypeLabels} />
          </InsightCard>

          <InsightCard title="Budget verdeling (totaal)" icon={<Wallet className="w-4 h-4" />}>
            <BarChart data={data.combined.budgets} labelMap={budgetLabels} color="green" />
          </InsightCard>

          <InsightCard title="Regio's (offertes)" icon={<MapPin className="w-4 h-4" />}>
            <BarChart data={regionArray} color="blue" />
          </InsightCard>

          <InsightCard title="Gemeentes (afspraken)" icon={<MapPin className="w-4 h-4" />}>
            <BarChart data={data.appointments.gemeentes} maxItems={8} color="amber" />
          </InsightCard>
        </div>
      )}

      {/* Quotes Tab */}
      {activeTab === 'quotes' && (
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <InsightCard title="Gevraagde diensten" icon={<Wrench className="w-4 h-4" />}>
            <BarChart data={data.quotes.serviceTypes} />
          </InsightCard>

          <InsightCard title="Type woning" icon={<Building2 className="w-4 h-4" />}>
            <BarChart data={data.quotes.propertyTypes} labelMap={propertyTypeLabels} color="blue" />
          </InsightCard>

          <InsightCard title="Budget indicatie" icon={<Wallet className="w-4 h-4" />}>
            <BarChart data={data.quotes.budgetRanges} labelMap={budgetLabels} color="green" />
          </InsightCard>

          <InsightCard title="Regio's (postcode)" icon={<MapPin className="w-4 h-4" />}>
            <BarChart data={regionArray} color="amber" />
          </InsightCard>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Interest percentages */}
          <div className="grid sm:grid-cols-2 gap-4">
            <InsightCard title="Interesse in subsidies" icon={<FileCheck className="w-4 h-4" />}>
              <PercentageRing
                percentage={data.appointments.subsidyInterest.percentage}
                label="Geïnteresseerd in subsidie-advies"
                count={data.appointments.subsidyInterest.count}
                total={data.appointments.subsidyInterest.total}
              />
            </InsightCard>

            <InsightCard title="Interesse in betalingsspreiding" icon={<Euro className="w-4 h-4" />}>
              <PercentageRing
                percentage={data.appointments.paymentSpread.percentage}
                label="Geïnteresseerd in betaling spreiden"
                count={data.appointments.paymentSpread.count}
                total={data.appointments.paymentSpread.total}
              />
            </InsightCard>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            <InsightCard title="Type project" icon={<Target className="w-4 h-4" />}>
              <BarChart data={data.appointments.projectTypes} labelMap={projectTypeLabels} />
            </InsightCard>

            <InsightCard title="Type woning" icon={<Building2 className="w-4 h-4" />}>
              <BarChart data={data.appointments.propertyTypes} labelMap={propertyTypeLabels} color="blue" />
            </InsightCard>

            <InsightCard title="Leeftijd woning" icon={<Building2 className="w-4 h-4" />}>
              <BarChart data={data.appointments.propertyAges} labelMap={propertyAgeLabels} color="amber" />
            </InsightCard>

            <InsightCard title="Budget" icon={<Wallet className="w-4 h-4" />}>
              <BarChart data={data.appointments.budgets} labelMap={budgetLabels} color="green" />
            </InsightCard>

            <InsightCard title="Prioriteiten" icon={<Leaf className="w-4 h-4" />}>
              <BarChart data={data.appointments.priorities} labelMap={priorityLabels} />
            </InsightCard>

            <InsightCard title="Materiaalvoorkeur" icon={<Leaf className="w-4 h-4" />}>
              <BarChart data={data.appointments.materials} labelMap={materialLabels} color="green" />
            </InsightCard>

            <InsightCard title="Motivatie" icon={<TrendingUp className="w-4 h-4" />}>
              <BarChart data={data.appointments.motivations} labelMap={motivationLabels} color="blue" />
            </InsightCard>

            <InsightCard title="Gemeentes" icon={<MapPin className="w-4 h-4" />}>
              <BarChart data={data.appointments.gemeentes} maxItems={8} color="amber" />
            </InsightCard>
          </div>
        </div>
      )}

      {/* Help text */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <p>
          <strong>Inzichten:</strong> Deze statistieken zijn gebaseerd op alle ingediende offerteaanvragen en adviesgesprek reserveringen. Ze helpen je om je doelgroep beter te begrijpen.
        </p>
      </div>
    </div>
  )
}
