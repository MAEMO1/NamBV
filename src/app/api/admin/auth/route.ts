import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
const SESSION_COOKIE_NAME = 'nam_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Simple session token generation
function generateSessionToken(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return `${timestamp}-${random}`
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json(
        { error: 'Onjuist wachtwoord' },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Succesvol ingelogd'
    })

    // Set cookie via response
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/'
    })

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

    // Delete cookie via response
    response.cookies.set(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

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
    const session = request.cookies.get(SESSION_COOKIE_NAME)

    if (!session?.value) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}
