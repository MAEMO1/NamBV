import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import {
  LEGACY_ADMIN_SESSION_COOKIE,
  verifyLegacyAdminSessionToken,
} from '@/lib/legacy-session'

export {
  createLegacyAdminSessionToken,
  getLegacyAdminLogoutCookie,
  getLegacyAdminSessionCookie,
  LEGACY_ADMIN_SESSION_COOKIE,
  LEGACY_ADMIN_SESSION_MAX_AGE,
  verifyLegacyAdminSessionToken,
} from '@/lib/legacy-session'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: UserRole
}

async function findLegacyAdminUser(userId: string) {
  return db.user.findFirst({
    where: {
      id: userId,
      isActive: true,
      role: { in: [UserRole.ADMIN, UserRole.SUPERADMIN] }
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true
    }
  })
}

export async function getDefaultLegacyAdminUser() {
  return db.user.findFirst({
    where: {
      isActive: true,
      role: { in: [UserRole.ADMIN, UserRole.SUPERADMIN] }
    },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true
    }
  })
}

/**
 * Auth check - validates session cookie and returns admin user
 */
export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const session = request.cookies.get(LEGACY_ADMIN_SESSION_COOKIE)

  if (!session?.value) {
    return null
  }

  try {
    const payload = await verifyLegacyAdminSessionToken(session.value)
    if (!payload) {
      return null
    }

    return findLegacyAdminUser(payload.sub)
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
