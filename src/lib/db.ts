import { PrismaClient } from '@prisma/client'

function getPrismaDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    return undefined
  }

  // Local and smoke runs execute as a single long-lived Node process instead of
  // Vercel's request-isolated runtime. Relax the pool a bit there so SSR/admin
  // requests don't starve behind a single pgbouncer connection.
  if (!process.env.VERCEL) {
    const url = new URL(databaseUrl)
    const configuredLimit = Number(url.searchParams.get('connection_limit') ?? '0')

    if (!Number.isFinite(configuredLimit) || configuredLimit < 5) {
      url.searchParams.set('connection_limit', '5')
    }

    if (!url.searchParams.has('pool_timeout')) {
      url.searchParams.set('pool_timeout', '30')
    }

    return url.toString()
  }

  return databaseUrl
}

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaDatabaseUrl = getPrismaDatabaseUrl()

export function hasDatabaseUrl() {
  return Boolean(prismaDatabaseUrl)
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  ...(prismaDatabaseUrl
    ? {
        datasources: {
          db: {
            url: prismaDatabaseUrl,
          },
        },
      }
    : {}),
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// ============================================================================
// Helper functions for common queries
// ============================================================================

/**
 * Generate next reference number (NAM-YYYY-XXXX)
 */
export async function generateReferenceNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const prefix = `NAM-${year}-`

  const lastQuote = await db.quoteRequest.findFirst({
    where: {
      referenceNumber: {
        startsWith: prefix
      }
    },
    orderBy: {
      referenceNumber: 'desc'
    },
    select: {
      referenceNumber: true
    }
  })

  let nextNumber = 1
  if (lastQuote) {
    const lastNumber = parseInt(lastQuote.referenceNumber.split('-')[2], 10)
    nextNumber = lastNumber + 1
  }

  return `${prefix}${nextNumber.toString().padStart(4, '0')}`
}

/**
 * Get quotes excluding soft-deleted ones
 */
export function getActiveQuotesQuery() {
  return {
    where: {
      deletedAt: null
    }
  }
}

/**
 * Soft delete a quote
 */
export async function softDeleteQuote(quoteId: string) {
  return db.quoteRequest.update({
    where: { id: quoteId },
    data: { deletedAt: new Date() }
  })
}

/**
 * Restore a soft-deleted quote
 */
export async function restoreQuote(quoteId: string) {
  return db.quoteRequest.update({
    where: { id: quoteId },
    data: { deletedAt: null }
  })
}
