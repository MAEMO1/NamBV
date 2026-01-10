import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: UserRole
}

/**
 * Simple auth check - in production, replace with proper JWT/session validation
 * For now, checks for X-User-Id header (set by your auth system)
 */
export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  // In production: validate JWT token or session
  // For development: use X-User-Id header
  const userId = request.headers.get('X-User-Id')

  if (!userId) {
    return null
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId, isActive: true },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true
      }
    })

    return user
  } catch {
    return null
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthUser | null, requiredRole: UserRole): boolean {
  if (!user) return false

  // Superadmin has all permissions
  if (user.role === UserRole.SUPERADMIN) return true

  return user.role === requiredRole
}

/**
 * Check if user is superadmin
 */
export function isSuperAdmin(user: AuthUser | null): boolean {
  return user?.role === UserRole.SUPERADMIN
}

/**
 * Unauthorized response
 */
export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: 'Niet geautoriseerd' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 * Forbidden response
 */
export function forbiddenResponse() {
  return new Response(
    JSON.stringify({ error: 'Geen toegang' }),
    { status: 403, headers: { 'Content-Type': 'application/json' } }
  )
}
