import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorizedResponse } from '@/lib/auth'
import { QuoteQuerySchema } from '@/lib/validations/quote'
import { Prisma } from '@prisma/client'
import { getCache, setCache } from '@/lib/cache'

// GET /api/admin/quotes - List all quotes with filters
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const queryParams = {
      status: searchParams.get('status') || undefined,
      assignedToId: searchParams.get('assignedToId') || undefined,
      postalCode: searchParams.get('postalCode') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      includeDeleted: searchParams.get('includeDeleted') || 'false'
    }

    const validationResult = QuoteQuerySchema.safeParse(queryParams)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Ongeldige parameters', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const query = validationResult.data
    const skip = (query.page - 1) * query.limit

    // Generate cache key based on query params
    const cacheKey = `quotes:${JSON.stringify(query)}`

    // Check cache first (only for default queries without search)
    if (!query.search) {
      const cached = getCache<{ quotes: unknown[], pagination: unknown }>(cacheKey)
      if (cached) {
        return NextResponse.json(cached)
      }
    }

    // Build where clause
    const where: Prisma.QuoteRequestWhereInput = {}

    if (!query.includeDeleted) {
      where.deletedAt = null
    }

    if (query.status) {
      where.status = query.status
    }

    if (query.assignedToId) {
      where.assignedToId = query.assignedToId
    }

    if (query.postalCode) {
      where.postalCode = { startsWith: query.postalCode }
    }

    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { referenceNumber: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } }
      ]
    }

    // Execute queries in parallel
    const [quotes, total] = await Promise.all([
      db.quoteRequest.findMany({
        where,
        include: {
          propertyType: true,
          services: {
            include: {
              serviceType: {
                select: { id: true, name: true, icon: true }
              }
            }
          },
          assignedTo: {
            select: { id: true, fullName: true }
          },
          _count: {
            select: { notes: true, photos: true }
          }
        },
        orderBy: { [query.sortBy]: query.sortOrder },
        skip,
        take: query.limit
      }),
      db.quoteRequest.count({ where })
    ])

    // Transform response
    const transformedQuotes = quotes.map(quote => ({
      id: quote.id,
      referenceNumber: quote.referenceNumber,
      status: quote.status,
      fullName: quote.fullName,
      email: quote.email,
      phone: quote.phone,
      postalCode: quote.postalCode,
      city: quote.city,
      propertyType: quote.propertyType?.name,
      services: quote.services.map(s => s.serviceType.name),
      budgetRange: quote.budgetRange,
      assignedTo: quote.assignedTo,
      notesCount: quote._count.notes,
      photosCount: quote._count.photos,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt
    }))

    const response = {
      quotes: transformedQuotes,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit)
      }
    }

    // Cache the response (skip if search query)
    if (!query.search) {
      setCache(cacheKey, response)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { error: 'Kon aanvragen niet ophalen' },
      { status: 500 }
    )
  }
}
