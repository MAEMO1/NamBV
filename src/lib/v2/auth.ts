import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { createHash, randomBytes } from 'crypto';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export const V2_ADMIN_SESSION_COOKIE = 'nam_v2_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const SESSION_TOUCH_INTERVAL_MS = 5 * 60 * 1000;

type SessionMeta = {
  ipAddress?: string | null;
  userAgent?: string | null;
};

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

function createSessionToken() {
  return randomBytes(32).toString('hex');
}

export function getSessionMetaFromRequest(request: NextRequest): SessionMeta {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return {
    ipAddress: forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip'),
    userAgent: request.headers.get('user-agent'),
  };
}

export async function recordLoginAttempt(email: string, meta: SessionMeta, wasSuccessful: boolean) {
  await db.v2LoginAttempt.create({
    data: {
      email,
      ipAddress: meta.ipAddress ?? null,
      wasSuccessful,
    },
  });
}

export async function isLoginRateLimited(email: string, meta: SessionMeta) {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);

  const [emailFailures, ipFailures] = await Promise.all([
    db.v2LoginAttempt.count({
      where: {
        email,
        wasSuccessful: false,
        createdAt: { gte: since },
      },
    }),
    meta.ipAddress
      ? db.v2LoginAttempt.count({
          where: {
            ipAddress: meta.ipAddress,
            wasSuccessful: false,
            createdAt: { gte: since },
          },
        })
      : Promise.resolve(0),
  ]);

  return emailFailures >= MAX_FAILED_ATTEMPTS || ipFailures >= MAX_FAILED_ATTEMPTS;
}

export async function authenticateV2Admin(email: string, password: string) {
  const user = await db.v2AdminUser.findUnique({
    where: { email },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const isValid = await compare(password, user.passwordHash);
  return isValid ? user : null;
}

export async function createV2AdminSession(userId: string, meta: SessionMeta) {
  const rawToken = createSessionToken();
  const tokenHash = hashToken(rawToken);

  await db.v2AdminSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
      ipAddress: meta.ipAddress ?? null,
      userAgent: meta.userAgent ?? null,
    },
  });

  return rawToken;
}

export async function invalidateV2AdminSession(rawToken: string) {
  await db.v2AdminSession.updateMany({
    where: {
      tokenHash: hashToken(rawToken),
      invalidatedAt: null,
    },
    data: {
      invalidatedAt: new Date(),
    },
  });
}

export async function getV2AdminUserFromToken(rawToken?: string | null) {
  if (!rawToken) {
    return null;
  }

  const session = await db.v2AdminSession.findFirst({
    where: {
      tokenHash: hashToken(rawToken),
      invalidatedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: {
      user: true,
    },
  });

  if (!session || !session.user.isActive) {
    return null;
  }

  if (!session.lastSeenAt || Date.now() - session.lastSeenAt.getTime() >= SESSION_TOUCH_INTERVAL_MS) {
    await db.v2AdminSession.update({
      where: { id: session.id },
      data: { lastSeenAt: new Date() },
    });
  }

  return session.user;
}

export async function getV2AdminUserFromRequest(request: NextRequest) {
  const rawToken = request.cookies.get(V2_ADMIN_SESSION_COOKIE)?.value;
  return getV2AdminUserFromToken(rawToken);
}

export async function getV2AdminUserFromCookieStore() {
  const cookieStore = await cookies();
  return getV2AdminUserFromToken(cookieStore.get(V2_ADMIN_SESSION_COOKIE)?.value);
}

export function getV2AdminSessionCookie(rawToken: string) {
  return {
    name: V2_ADMIN_SESSION_COOKIE,
    value: rawToken,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    },
  };
}

export function getV2AdminLogoutCookie() {
  return {
    name: V2_ADMIN_SESSION_COOKIE,
    value: '',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0,
    },
  };
}
