import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// Parse user agent to get device type, browser, and OS
function parseUserAgent(ua: string | null) {
  if (!ua) return { deviceType: 'unknown', browser: 'unknown', os: 'unknown' }

  // Device type
  let deviceType = 'desktop'
  if (/Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    deviceType = /iPad|Tablet/i.test(ua) ? 'tablet' : 'mobile'
  }

  // Browser
  let browser = 'unknown'
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera'

  // OS
  let os = 'unknown'
  if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac OS')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'

  return { deviceType, browser, os }
}

// Generate a simple hash for visitor fingerprinting (privacy-friendly)
function generateVisitorId(ip: string, userAgent: string): string {
  const data = `${ip}-${userAgent}`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, path, referrer, sessionId, utmSource, utmMedium, utmCampaign, eventName, eventData } = body

    // Skip tracking for admin pages (server-side check)
    if (path && path.startsWith('/admin')) {
      return NextResponse.json({ success: true, skipped: true })
    }

    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ||
               headersList.get('x-real-ip') ||
               'unknown'

    const visitorId = generateVisitorId(ip, userAgent)
    const { deviceType, browser, os } = parseUserAgent(userAgent)

    if (type === 'pageview') {
      // Record page view
      await db.pageView.create({
        data: {
          path,
          referrer,
          visitorId,
          sessionId: sessionId || visitorId,
          userAgent,
          deviceType,
          browser,
          os,
          utmSource,
          utmMedium,
          utmCampaign,
        },
      })

      // Update daily stats
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      await db.dailyStats.upsert({
        where: { date: today },
        create: {
          date: today,
          pageViews: 1,
          uniqueVisitors: 1,
          sessions: 1,
          desktopVisits: deviceType === 'desktop' ? 1 : 0,
          mobileVisits: deviceType === 'mobile' ? 1 : 0,
          tabletVisits: deviceType === 'tablet' ? 1 : 0,
        },
        update: {
          pageViews: { increment: 1 },
          desktopVisits: deviceType === 'desktop' ? { increment: 1 } : undefined,
          mobileVisits: deviceType === 'mobile' ? { increment: 1 } : undefined,
          tabletVisits: deviceType === 'tablet' ? { increment: 1 } : undefined,
        },
      })

      // Check if this is a new unique visitor today
      const existingVisitorToday = await db.pageView.count({
        where: {
          visitorId,
          createdAt: {
            gte: today,
          },
        },
      })

      if (existingVisitorToday === 1) {
        await db.dailyStats.update({
          where: { date: today },
          data: { uniqueVisitors: { increment: 1 } },
        })
      }
    } else if (type === 'event') {
      // Record analytics event
      await db.analyticsEvent.create({
        data: {
          eventType: body.eventType || 'custom',
          eventName: eventName || 'unknown',
          eventData,
          path,
          visitorId,
          sessionId: sessionId || visitorId,
        },
      })

      // Track conversions in daily stats
      if (eventName === 'quote_submit') {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        await db.dailyStats.upsert({
          where: { date: today },
          create: {
            date: today,
            quoteRequests: 1,
          },
          update: {
            quoteRequests: { increment: 1 },
          },
        })
      } else if (eventName === 'appointment_submit') {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        await db.dailyStats.upsert({
          where: { date: today },
          create: {
            date: today,
            appointments: 1,
          },
          update: {
            appointments: { increment: 1 },
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ success: true }) // Silent fail for tracking
  }
}
