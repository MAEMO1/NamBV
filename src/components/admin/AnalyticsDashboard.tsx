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
  accent?: boolean
}

function StatCard({ title, value, subtitle, icon, trend, accent }: StatCardProps) {
  return (
    <div className={`bg-white border p-6 ${accent ? 'border-accent-200' : 'border-noir-100'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-noir-500 uppercase tracking-wider font-medium mb-2">{title}</p>
          <p className="text-3xl font-display font-medium text-noir-900">{value}</p>
          {subtitle && <p className="text-xs text-noir-400 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend.value}% vs vorige periode
            </p>
          )}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center ${accent ? 'bg-accent-50 text-accent-600' : 'bg-noir-50 text-noir-600'}`}>
          {icon}
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
          <div key={i} className="h-32 bg-noir-50 animate-pulse" />
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
    <div className="space-y-8">
      {/* Header with period selector */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['7d', '30d', '90d', '12m'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-accent-600 text-white'
                  : 'border border-noir-200 text-noir-600 hover:bg-noir-50'
              }`}
            >
              {p === '7d' && 'Laatste 7 dagen'}
              {p === '30d' && 'Laatste 30 dagen'}
              {p === '90d' && 'Laatste 90 dagen'}
              {p === '12m' && 'Laatste 12 maanden'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchAnalytics}
            className="p-2 border border-noir-200 text-noir-600 hover:bg-noir-50"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white text-sm font-medium hover:bg-accent-700"
          >
            <Download className="w-4 h-4" />
            Exporteer CSV
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          accent
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
          accent
        />
      </div>

      {/* Charts and Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white border border-noir-100 p-6">
          <h3 className="text-base font-display font-medium text-noir-900 mb-6">
            Populaire pagina's
          </h3>
          {data?.topPages && data.topPages.length > 0 ? (
            <div className="space-y-3">
              {data.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center gap-4">
                  <span className="text-xs text-noir-400 w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-noir-900 truncate">{page.path}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-noir-400 text-sm">Nog geen data beschikbaar</p>
          )}
        </div>

        {/* Device Breakdown */}
        <div className="bg-white border border-noir-100 p-6">
          <h3 className="text-base font-display font-medium text-noir-900 mb-6">
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
                        <span className="text-sm font-medium text-noir-700 capitalize">
                          {device.device}
                        </span>
                      </div>
                      <span className="text-sm text-noir-500">
                        {percentage}% ({device.count.toLocaleString()})
                      </span>
                    </div>
                    <div className="h-2 bg-noir-100 overflow-hidden">
                      <div
                        className="h-full bg-accent-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-noir-400 text-sm">Nog geen data beschikbaar</p>
          )}
        </div>

        {/* Traffic Sources */}
        <div className="bg-white border border-noir-100 p-6">
          <h3 className="text-base font-display font-medium text-noir-900 mb-6">
            Verkeersbronnen
          </h3>
          {data?.trafficSources && data.trafficSources.length > 0 ? (
            <div className="space-y-3">
              {data.trafficSources.map((source, index) => (
                <div key={source.source} className="flex items-center gap-4">
                  <span className="text-xs text-noir-400 w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-noir-900 truncate">{source.source}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {source.visits.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-noir-400 text-sm">Meeste bezoekers komen direct</p>
          )}
        </div>

        {/* Browser Breakdown */}
        <div className="bg-white border border-noir-100 p-6">
          <h3 className="text-base font-display font-medium text-noir-900 mb-6">
            Browsers
          </h3>
          {data?.browserBreakdown && data.browserBreakdown.length > 0 ? (
            <div className="space-y-3">
              {data.browserBreakdown.map((browser, index) => (
                <div key={browser.browser} className="flex items-center gap-4">
                  <span className="text-xs text-noir-400 w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-noir-900">{browser.browser}</p>
                  </div>
                  <span className="text-sm font-medium text-accent-600">
                    {browser.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-noir-400 text-sm">Nog geen data beschikbaar</p>
          )}
        </div>
      </div>

      {/* Recent Conversions */}
      {data?.recentConversions && data.recentConversions.length > 0 && (
        <div className="bg-white border border-noir-100 p-6">
          <h3 className="text-base font-display font-medium text-noir-900 mb-6">
            Recente conversies
          </h3>
          <div className="space-y-3">
            {data.recentConversions.map(conversion => (
              <div key={conversion.id} className="flex items-center gap-4 p-3 bg-ivory-100">
                <div className={`px-2 py-1 text-xs font-medium ${
                  conversion.type === 'quote_submit'
                    ? 'bg-accent-100 text-accent-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {conversion.type === 'quote_submit' ? 'Offerte' : 'Afspraak'}
                </div>
                <span className="text-sm text-noir-600">{conversion.path}</span>
                <span className="text-xs text-noir-400 ml-auto">
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
