import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

// Check if user is authenticated
async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 7d, 30d, 90d, 12m

    // Calculate date range
    const now = new Date()
    let startDate = new Date()

    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '12m':
        startDate.setMonth(now.getMonth() - 12)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Get daily stats for the period
    const dailyStats = await db.dailyStats.findMany({
      where: {
        date: {
          gte: startDate,
          lte: now,
        },
      },
      orderBy: { date: 'asc' },
    })

    // Get today's stats (may not be in dailyStats yet)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayPageViews = await db.pageView.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    })

    const todayUniqueVisitors = await db.pageView.groupBy({
      by: ['visitorId'],
      where: {
        createdAt: {
          gte: today,
        },
      },
    })

    // Get total page views and unique visitors for the period
    const totalPageViews = await db.pageView.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    const uniqueVisitors = await db.pageView.groupBy({
      by: ['visitorId'],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    // Get top pages
    const topPages = await db.pageView.groupBy({
      by: ['path'],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      _count: {
        path: true,
      },
      orderBy: {
        _count: {
          path: 'desc',
        },
      },
      take: 10,
    })

    // Get traffic sources (referrers)
    const trafficSources = await db.pageView.groupBy({
      by: ['referrer'],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
        referrer: {
          not: null,
        },
      },
      _count: {
        referrer: true,
      },
      orderBy: {
        _count: {
          referrer: 'desc',
        },
      },
      take: 10,
    })

    // Get device breakdown
    const deviceBreakdown = await db.pageView.groupBy({
      by: ['deviceType'],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      _count: {
        deviceType: true,
      },
    })

    // Get browser breakdown
    const browserBreakdown = await db.pageView.groupBy({
      by: ['browser'],
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      _count: {
        browser: true,
      },
      orderBy: {
        _count: {
          browser: 'desc',
        },
      },
      take: 5,
    })

    // Get conversions (quote requests and appointments)
    const quoteRequests = await db.quoteRequest.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    const appointments = await db.appointment.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    // Calculate conversion rate
    const totalUniqueVisitors = uniqueVisitors.length || 1
    const conversionRate = ((quoteRequests + appointments) / totalUniqueVisitors * 100).toFixed(2)

    // Get recent events
    const recentEvents = await db.analyticsEvent.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
        eventType: 'conversion',
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Format daily stats for chart
    const chartData = dailyStats.map(stat => ({
      date: stat.date.toISOString().split('T')[0],
      pageViews: stat.pageViews,
      uniqueVisitors: stat.uniqueVisitors,
      quoteRequests: stat.quoteRequests,
      appointments: stat.appointments,
    }))

    return NextResponse.json({
      overview: {
        totalPageViews,
        uniqueVisitors: uniqueVisitors.length,
        todayPageViews,
        todayUniqueVisitors: todayUniqueVisitors.length,
        quoteRequests,
        appointments,
        conversionRate: parseFloat(conversionRate),
      },
      topPages: topPages.map(p => ({
        path: p.path,
        views: p._count.path,
      })),
      trafficSources: trafficSources.map(s => ({
        source: s.referrer ? new URL(s.referrer).hostname : 'Direct',
        visits: s._count.referrer,
      })),
      deviceBreakdown: deviceBreakdown.map(d => ({
        device: d.deviceType || 'unknown',
        count: d._count.deviceType,
      })),
      browserBreakdown: browserBreakdown.map(b => ({
        browser: b.browser || 'unknown',
        count: b._count.browser,
      })),
      chartData,
      recentConversions: recentEvents.map(e => ({
        id: e.id,
        type: e.eventName,
        path: e.path,
        createdAt: e.createdAt,
      })),
    })
  } catch (error) {
    console.error('Analytics dashboard error:', error)
    return NextResponse.json(
      { error: 'Kon analytics niet laden' },
      { status: 500 }
    )
  }
}
