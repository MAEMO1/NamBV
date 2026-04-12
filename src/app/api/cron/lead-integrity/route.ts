import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireCronSecret } from '@/lib/cron-auth';
import { captureOperationalMessage, captureRouteException } from '@/lib/monitoring';
import { analyzeLeadIntegrity, LEAD_WINDOW_MINUTES } from '@/lib/monitoring-checks';
import { sendOperationalAlert } from '@/lib/operations-alerts';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const unauthorized = requireCronSecret(request);
  if (unauthorized) {
    return unauthorized;
  }

  const since = new Date(Date.now() - LEAD_WINDOW_MINUTES * 60 * 1000);

  try {
    const [submissionAttempts, leadEvents] = await Promise.all([
      db.v2SubmissionAttempt.groupBy({
        by: ['kind', 'reason', 'wasAccepted'],
        _count: { _all: true },
        where: {
          createdAt: { gte: since },
        },
      }),
      db.v2LeadEvent.groupBy({
        by: ['leadType', 'eventType'],
        _count: { _all: true },
        where: {
          createdAt: { gte: since },
          eventType: 'submitted',
        },
      }),
    ]);

    const acceptedByKind = {
      quote: 0,
      appointment: 0,
    };
    const submittedEventsByKind = {
      quote: 0,
      appointment: 0,
    };
    const failedByReason = {
      quote: {} as Record<string, number>,
      appointment: {} as Record<string, number>,
    };

    for (const attempt of submissionAttempts) {
      const kind = attempt.kind === 'appointment' ? 'appointment' : 'quote';
      const count = typeof attempt._count === 'number' ? attempt._count : attempt._count._all ?? 0;

      if (attempt.wasAccepted) {
        acceptedByKind[kind] += count;
      } else {
        const reason = attempt.reason ?? 'unknown';
        failedByReason[kind][reason] = (failedByReason[kind][reason] ?? 0) + count;
      }
    }

    for (const event of leadEvents) {
      const kind = event.leadType === 'appointment' ? 'appointment' : 'quote';
      const count = typeof event._count === 'number' ? event._count : event._count._all ?? 0;
      submittedEventsByKind[kind] += count;
    }

    const anomalies = analyzeLeadIntegrity({
      acceptedByKind,
      submittedEventsByKind,
      failedByReason,
    });

    if (anomalies.length > 0) {
      await sendOperationalAlert({
        subject: 'Lead integrity anomaly detected',
        lines: [
          `Window: last ${LEAD_WINDOW_MINUTES} minutes`,
          ...anomalies,
        ],
      });

      captureOperationalMessage('Lead integrity anomaly detected', {
        route: '/api/cron/lead-integrity',
        tags: { windowMinutes: LEAD_WINDOW_MINUTES },
        extra: {
          acceptedByKind,
          submittedEventsByKind,
          failedByReason,
          anomalies,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      acceptedByKind,
      submittedEventsByKind,
      failedByReason,
      anomalies,
    });
  } catch (error) {
    captureRouteException(error, {
      action: 'cron.lead-integrity',
      route: '/api/cron/lead-integrity',
    });

    return NextResponse.json({ error: 'Lead integrity check failed' }, { status: 500 });
  }
}
