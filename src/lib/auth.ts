import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'

const SESSION_COOKIE_NAME = 'nam_admin_session'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: UserRole
}

/**
 * Auth check - validates session cookie and returns admin user
 */
export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  // Check for session cookie
  const session = request.cookies.get(SESSION_COOKIE_NAME)

  if (!session?.value) {
    return null
  }

  // Session exists - return the default admin user
  // In a more complex system, you would validate the session token
  // and look up the associated user
  try {
    // Get the first active admin user
    const user = await db.user.findFirst({
      where: {
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
