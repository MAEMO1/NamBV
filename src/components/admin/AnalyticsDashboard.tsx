'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalPageViews: number
    uniqueVisitors: number
    todayPageViews: number
    todayUniqueVisitors: number
    quoteRequests: number
    appointments: number
    conversionRate: number
  }
  topPages: { path: string; views: number }[]
  trafficSources: { source: string; visits: number }[]
  deviceBreakdown: { device: string; count: number }[]
  browserBreakdown: { browser: string; count: number }[]
  chartData: {
    date: string
    pageViews: number
    uniqueVisitors: number
    quoteRequests: number
    appointments: number
  }[]
  recentConversions: {
    id: string
    type: string
    path: string
    createdAt: string
  }[]
}

interface StatCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: React.ReactNode
  trend?: { value: number; isPositive: boolean }
  highlight?: boolean
}

function StatCard({ title, value, subtitle, icon, trend, highlight }: StatCardProps) {
  return (
    <div className={`p-3 sm:p-5 rounded-xl transition-all duration-200 ${
      highlight
        ? 'bg-accent-600 text-white'
        : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm'
    }`}>
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className={`text-[10px] sm:text-xs font-medium mb-1 sm:mb-2 truncate ${highlight ? 'text-white/70' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className={`text-lg sm:text-2xl font-semibold tracking-tight ${highlight ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          {subtitle && <p className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 truncate ${highlight ? 'text-white/60' : 'text-gray-400'}`}>{subtitle}</p>}
          {trend && (
            <p className={`text-[10px] sm:text-xs mt-1 sm:mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              <span className="hidden sm:inline">{trend.value}% vs vorige periode</span>
              <span className="sm:hidden">{trend.value}%</span>
            </p>
          )}
        </div>
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          highlight ? 'bg-white/10' : 'bg-gray-50'
        }`}>
          <span className={`${highlight ? 'text-white/80' : 'text-gray-400'} [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5`}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('7d')

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics/dashboard?period=${period}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const handleExport = () => {
    window.open('/api/admin/export?type=analytics', '_blank')
  }

  if (loading && !data) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-gray-50 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  const deviceIcons: Record<string, React.ReactNode> = {
    desktop: <Monitor className="w-4 h-4" />,
    mobile: <Smartphone className="w-4 h-4" />,
    tablet: <Tablet className="w-4 h-4" />,
    unknown: <Globe className="w-4 h-4" />,
  }

  const totalDeviceVisits = data?.deviceBreakdown.reduce((acc, d) => acc + d.count, 0) || 1

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with period selector */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {['7d', '30d', '90d', '12m'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                period === p
                  ? 'bg-accent-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p === '7d' && '7 dagen'}
              {p === '30d' && '30 dagen'}
              {p === '90d' && '90 dagen'}
              {p === '12m' && '12 maanden'}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={fetchAnalytics}
            className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <StatCard
          title="Paginaweergaves"
          value={data?.overview.totalPageViews.toLocaleString() || 0}
          subtitle={`${data?.overview.todayPageViews || 0} vandaag`}
          icon={<Eye className="w-5 h-5" />}
        />
        <StatCard
          title="Unieke bezoekers"
          value={data?.overview.uniqueVisitors.toLocaleString() || 0}
          subtitle={`${data?.overview.todayUniqueVisitors || 0} vandaag`}
          icon={<Users className="w-5 h-5" />}
          highlight
        />
        <StatCard
          title="Conversies"
          value={(data?.overview.quoteRequests || 0) + (data?.overview.appointments || 0)}
          subtitle={`${data?.overview.quoteRequests || 0} offertes, ${data?.overview.appointments || 0} afspraken`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Conversieratio"
          value={`${data?.overview.conversionRate || 0}%`}
          subtitle="Bezoekers → leads"
          icon={<MousePointer className="w-5 h-5" />}
          highlight
        />
      </div>

      {/* Charts and Details */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3 sm:mb-4">
            Populaire pagina&apos;s
          </h3>
          {data?.topPages && data.topPages.length > 0 ? (
            <div className="space-y-3">
              {data.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{page.path}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Nog geen data beschikbaar</p>
          )}
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3 sm:mb-4">
            Apparaten
          </h3>
          {data?.deviceBreakdown && data.deviceBreakdown.length > 0 ? (
            <div className="space-y-4">
              {data.deviceBreakdown.map(device => {
                const percentage = Math.round((device.count / totalDeviceVisits) * 100)
                return (
                  <div key={device.device}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {deviceIcons[device.device] || deviceIcons.unknown}
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {device.device}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {percentage}% ({device.count.toLocaleString()})
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Nog geen data beschikbaar</p>
          )}
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3 sm:mb-4">
            Verkeersbronnen
          </h3>
          {data?.trafficSources && data.trafficSources.length > 0 ? (
            <div className="space-y-3">
              {data.trafficSources.map((source, index) => (
                <div key={source.source} className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{source.source}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {source.visits.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Meeste bezoekers komen direct</p>
          )}
        </div>

        {/* Browser Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-3 sm:mb-4">
            Browsers
          </h3>
          {data?.browserBreakdown && data.browserBreakdown.length > 0 ? (
            <div className="space-y-3">
              {data.browserBreakdown.map((browser, index) => (
                <div key={browser.browser} className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{browser.browser}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {browser.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Nog geen data beschikbaar</p>
          )}
        </div>
      </div>

      {/* Recent Conversions */}
      {data?.recentConversions && data.recentConversions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Recente conversies
          </h3>
          <div className="space-y-3">
            {data.recentConversions.map(conversion => (
              <div key={conversion.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`px-2 py-1 text-xs font-medium rounded ${
                  conversion.type === 'quote_submit'
                    ? 'bg-accent-100 text-accent-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {conversion.type === 'quote_submit' ? 'Offerte' : 'Afspraak'}
                </div>
                <span className="text-sm text-gray-600">{conversion.path}</span>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(conversion.createdAt).toLocaleString('nl-BE')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
