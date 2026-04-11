export const LEGACY_ADMIN_SESSION_COOKIE = 'nam_admin_session'
export const LEGACY_ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7

type LegacySessionPayload = {
  sub: string
  exp: number
  nonce: string
}

function getLegacyAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'admin'
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function encodeBase64Url(value: string) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64url')
  }

  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function decodeBase64Url(value: string) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'base64url').toString('utf8')
  }

  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  return atob(padded)
}

async function signLegacySessionValue(value: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getLegacyAdminSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return bytesToHex(new Uint8Array(signature))
}

export async function createLegacyAdminSessionToken(userId: string) {
  const payload: LegacySessionPayload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + LEGACY_ADMIN_SESSION_MAX_AGE,
    nonce: crypto.randomUUID(),
  }

  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = await signLegacySessionValue(encodedPayload)
  return `${encodedPayload}.${signature}`
}

export async function verifyLegacyAdminSessionToken(token?: string | null) {
  if (!token) {
    return null
  }

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = await signLegacySessionValue(encodedPayload)
  if (signature !== expectedSignature) {
    return null
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as LegacySessionPayload

    if (!payload.sub || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function getLegacyAdminSessionCookie(sessionToken: string) {
  return {
    name: LEGACY_ADMIN_SESSION_COOKIE,
    value: sessionToken,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: LEGACY_ADMIN_SESSION_MAX_AGE,
      path: '/',
    },
  }
}

export function getLegacyAdminLogoutCookie() {
  return {
    name: LEGACY_ADMIN_SESSION_COOKIE,
    value: '',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 0,
      path: '/',
    },
  }
}
