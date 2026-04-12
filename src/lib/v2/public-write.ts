import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export type V2PublicWriteKind = 'quote' | 'appointment';

type V2PublicWriteMeta = {
  email?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS_PER_IP = 10;
const MAX_ATTEMPTS_PER_EMAIL = 5;

export function normalizeSubmissionEmail(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

export function hasTriggeredHoneypot(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function getPublicWriteMetaFromRequest(request: NextRequest, email?: string | null): V2PublicWriteMeta {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return {
    email: email ?? null,
    ipAddress: forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip'),
    userAgent: request.headers.get('user-agent'),
  };
}

export async function isPublicSubmissionRateLimited(
  kind: V2PublicWriteKind,
  meta: V2PublicWriteMeta,
) {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);

  const [ipAttempts, emailAttempts] = await Promise.all([
    meta.ipAddress
      ? db.v2SubmissionAttempt.count({
          where: {
            kind,
            ipAddress: meta.ipAddress,
            createdAt: { gte: since },
          },
        })
      : Promise.resolve(0),
    meta.email
      ? db.v2SubmissionAttempt.count({
          where: {
            kind,
            email: meta.email,
            createdAt: { gte: since },
          },
        })
      : Promise.resolve(0),
  ]);

  return ipAttempts >= MAX_ATTEMPTS_PER_IP || emailAttempts >= MAX_ATTEMPTS_PER_EMAIL;
}

export async function recordPublicSubmissionAttempt(input: {
  kind: V2PublicWriteKind;
  meta: V2PublicWriteMeta;
  wasAccepted: boolean;
  reason?: string | null;
}) {
  await db.v2SubmissionAttempt.create({
    data: {
      kind: input.kind,
      email: input.meta.email ?? null,
      ipAddress: input.meta.ipAddress ?? null,
      userAgent: input.meta.userAgent ?? null,
      wasAccepted: input.wasAccepted,
      reason: input.reason ?? null,
    },
  });
}
