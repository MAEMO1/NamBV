import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorizedResponse } from '@/lib/auth'
import { QuoteStatus } from '@prisma/client'

// GET /api/admin/analytics - Dashboard statistics
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Execute all queries in parallel
    const [
      totalQuotes,
      quotesByStatus,
      quotesThisWeek,
      quotesThisMonth,
      quotesLastMonth,
      wonThisMonth,
      wonLastMonth,
      topServices,
      topPostalCodes,
      recentQuotes
    ] = await Promise.all([
      // Total quotes (excluding deleted)
      db.quoteRequest.count({
        where: { deletedAt: null }
      }),

      // Quotes by status
      db.quoteRequest.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: true
      }),

      // Quotes this week
      db.quoteRequest.count({
        where: {
          deletedAt: null,
          createdAt: { gte: startOfWeek }
        }
      }),

      // Quotes this month
      db.quoteRequest.count({
        where: {
          deletedAt: null,
          createdAt: { gte: startOfMonth }
        }
      }),

      // Quotes last month (for comparison)
      db.quoteRequest.count({
        where: {
          deletedAt: null,
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth
          }
        }
      }),

      // Won this month
      db.quoteRequest.count({
        where: {
          deletedAt: null,
          status: QuoteStatus.WON,
          convertedAt: { gte: startOfMonth }
        }
      }),

      // Won last month
      db.quoteRequest.count({
        where: {
          deletedAt: null,
          status: QuoteStatus.WON,
          convertedAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth
          }
        }
      }),

      // Top services
      db.quoteServiceSelection.groupBy({
        by: ['serviceTypeId'],
        _count: true,
        orderBy: { _count: { serviceTypeId: 'desc' } },
        take: 5
      }),

      // Top postal codes
      db.quoteRequest.groupBy({
        by: ['postalCode'],
        where: { deletedAt: null },
        _count: true,
        orderBy: { _count: { postalCode: 'desc' } },
        take: 5
      }),

      // Recent quotes for dashboard
      db.quoteRequest.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          referenceNumber: true,
          status: true,
          fullName: true,
          createdAt: true
        }
      })
    ])

    // Transform status counts
    const statusCounts = Object.values(QuoteStatus).reduce((acc, status) => {
      const found = quotesByStatus.find(s => s.status === status)
      acc[status] = found?._count || 0
      return acc
    }, {} as Record<QuoteStatus, number>)

    // Get service names for top services
    const serviceIds = topServices.map(s => s.serviceTypeId)
    const serviceNames = await db.serviceType.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, name: true }
    })
    const serviceNameMap = new Map(serviceNames.map(s => [s.id, s.name]))

    // Calculate metrics
    const newQuotes = statusCounts[QuoteStatus.NEW] || 0
    const wonQuotes = (statusCounts[QuoteStatus.WON] || 0)
    const closedQuotes = wonQuotes + (statusCounts[QuoteStatus.LOST] || 0)
    const conversionRate = closedQuotes > 0
      ? Math.round((wonQuotes / closedQuotes) * 100)
      : 0

    // Week over week change
    const weeklyGrowth = quotesLastMonth > 0
      ? Math.round(((quotesThisMonth - quotesLastMonth) / quotesLastMonth) * 100)
      : 0

    return NextResponse.json({
      overview: {
        totalQuotes,
        newQuotes,
        wonQuotes,
        conversionRate,
        quotesThisWeek,
        quotesThisMonth,
        weeklyGrowth
      },
      quotesByStatus: statusCounts,
      topServices: topServices.map(s => ({
        service: serviceNameMap.get(s.serviceTypeId) || 'Onbekend',
        count: s._count
      })),
      topPostalCodes: topPostalCodes.map(p => ({
        postalCode: p.postalCode,
        count: p._count
      })),
      recentQuotes
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Kon statistieken niet ophalen' },
      { status: 500 }
    )
  }
}
