import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { recordV2AuditEvent } from '@/lib/v2/audit';
import {
  authenticateV2Admin,
  createV2AdminSession,
  getSessionMetaFromRequest,
  getV2AdminLogoutCookie,
  getV2AdminSessionCookie,
  getV2AdminUserFromRequest,
  invalidateV2AdminSession,
  isLoginRateLimited,
  recordLoginAttempt,
  V2_ADMIN_SESSION_COOKIE,
} from '@/lib/v2/auth';
import { v2AdminLoginSchema } from '@/lib/v2/schemas';
import { zodErrorResponse } from '@/lib/v2/request';

export async function GET(request: NextRequest) {
  const user = await getV2AdminUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = v2AdminLoginSchema.parse(body);
    const meta = getSessionMetaFromRequest(request);

    if (await isLoginRateLimited(payload.email, meta)) {
      await recordLoginAttempt(payload.email, meta, false);
      return NextResponse.json({ error: 'Too many failed login attempts' }, { status: 429 });
    }

    const user = await authenticateV2Admin(payload.email, payload.password);

    if (!user) {
      await recordLoginAttempt(payload.email, meta, false);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await recordLoginAttempt(payload.email, meta, true);

    const rawToken = await createV2AdminSession(user.id, meta);
    await db.v2AdminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await recordV2AuditEvent({
      action: 'auth.login',
      entityType: 'session',
      entityId: user.id,
      actorId: user.id,
      payload: { email: user.email },
    });

    const response = NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
    const cookie = getV2AdminSessionCookie(rawToken);
    response.cookies.set(cookie.name, cookie.value, cookie.options);
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    console.error('v2 session login failed', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getV2AdminUserFromRequest(request);
  const rawToken = request.cookies.get(V2_ADMIN_SESSION_COOKIE)?.value;

  if (rawToken) {
    await invalidateV2AdminSession(rawToken);
  }

  if (user) {
    await recordV2AuditEvent({
      action: 'auth.logout',
      entityType: 'session',
      entityId: user.id,
      actorId: user.id,
      payload: { email: user.email },
    });
  }

  const response = NextResponse.json({ success: true });
  const cookie = getV2AdminLogoutCookie();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
