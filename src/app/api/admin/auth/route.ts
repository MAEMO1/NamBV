import { NextRequest, NextResponse } from 'next/server'
import {
  createLegacyAdminSessionToken,
  getDefaultLegacyAdminUser,
  getLegacyAdminLogoutCookie,
  getLegacyAdminSessionCookie,
  LEGACY_ADMIN_SESSION_COOKIE,
  verifyLegacyAdminSessionToken,
} from '@/lib/auth'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
const LOGIN_WINDOW_MS = 15 * 60 * 1000
const MAX_FAILED_ATTEMPTS = 5

const loginAttempts = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(clientKey: string) {
  const attempt = loginAttempts.get(clientKey)
  if (!attempt) {
    return false
  }

  if (attempt.resetAt <= Date.now()) {
    loginAttempts.delete(clientKey)
    return false
  }

  return attempt.count >= MAX_FAILED_ATTEMPTS
}

function recordFailedAttempt(clientKey: string) {
  const current = loginAttempts.get(clientKey)

  if (!current || current.resetAt <= Date.now()) {
    loginAttempts.set(clientKey, {
      count: 1,
      resetAt: Date.now() + LOGIN_WINDOW_MS,
    })
    return
  }

  loginAttempts.set(clientKey, {
    count: current.count + 1,
    resetAt: current.resetAt,
  })
}

function clearFailedAttempts(clientKey: string) {
  loginAttempts.delete(clientKey)
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const clientKey = getClientKey(request)
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { error: 'Te veel mislukte inlogpogingen. Probeer later opnieuw.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Wachtwoord is verplicht' },
        { status: 400 }
      )
    }

    // Check password
    if (password !== ADMIN_PASSWORD) {
      recordFailedAttempt(clientKey)
      return NextResponse.json(
        { error: 'Onjuist wachtwoord' },
        { status: 401 }
      )
    }

    const user = await getDefaultLegacyAdminUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Geen actieve admin-gebruiker gevonden' },
        { status: 500 }
      )
    }

    clearFailedAttempts(clientKey)

    const sessionToken = await createLegacyAdminSessionToken(user.id)

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Succesvol ingelogd',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      }
    })

    const cookie = getLegacyAdminSessionCookie(sessionToken)
    response.cookies.set(cookie.name, cookie.value, cookie.options)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/auth - Logout
export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Succesvol uitgelogd'
    })

    const cookie = getLegacyAdminLogoutCookie()
    response.cookies.set(cookie.name, cookie.value, cookie.options)

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    )
  }
}

// GET /api/admin/auth - Check session
export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get(LEGACY_ADMIN_SESSION_COOKIE)

    const payload = await verifyLegacyAdminSessionToken(session?.value)
    if (!payload) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      userId: payload.sub,
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}
