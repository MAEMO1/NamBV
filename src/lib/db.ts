import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
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
