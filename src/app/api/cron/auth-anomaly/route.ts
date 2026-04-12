import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireCronSecret } from '@/lib/cron-auth';
import { captureOperationalMessage, captureRouteException } from '@/lib/monitoring';
import { analyzeAuthAnomalies, AUTH_WINDOW_MINUTES } from '@/lib/monitoring-checks';
import { sendOperationalAlert } from '@/lib/operations-alerts';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const unauthorized = requireCronSecret(request);
  if (unauthorized) {
    return unauthorized;
  }

  const since = new Date(Date.now() - AUTH_WINDOW_MINUTES * 60 * 1000);

  try {
    const failedAttempts = await db.v2LoginAttempt.findMany({
      where: {
        createdAt: { gte: since },
        wasSuccessful: false,
      },
      select: {
        email: true,
        ipAddress: true,
      },
    });

    const failuresByEmail: Record<string, number> = {};
    const failuresByIp: Record<string, number> = {};

    for (const attempt of failedAttempts) {
      failuresByEmail[attempt.email] = (failuresByEmail[attempt.email] ?? 0) + 1;

      if (attempt.ipAddress) {
        failuresByIp[attempt.ipAddress] = (failuresByIp[attempt.ipAddress] ?? 0) + 1;
      }
    }

    const anomalies = analyzeAuthAnomalies({
      totalFailures: failedAttempts.length,
      failuresByEmail,
      failuresByIp,
    });

    if (anomalies.length > 0) {
      await sendOperationalAlert({
        subject: 'Admin auth anomaly detected',
        lines: [
          `Window: last ${AUTH_WINDOW_MINUTES} minutes`,
          ...anomalies,
        ],
      });

      captureOperationalMessage('Admin auth anomaly detected', {
        route: '/api/cron/auth-anomaly',
        tags: { windowMinutes: AUTH_WINDOW_MINUTES },
        extra: {
          totalFailures: failedAttempts.length,
          failuresByEmail,
          failuresByIp,
          anomalies,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      totalFailures: failedAttempts.length,
      failuresByEmail,
      failuresByIp,
      anomalies,
    });
  } catch (error) {
    captureRouteException(error, {
      action: 'cron.auth-anomaly',
      route: '/api/cron/auth-anomaly',
    });

    return NextResponse.json({ error: 'Auth anomaly check failed' }, { status: 500 });
  }
}
