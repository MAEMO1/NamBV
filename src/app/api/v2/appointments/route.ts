import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createV2Appointment } from '@/lib/v2/mutations';
import {
  getPublicWriteMetaFromRequest,
  hasTriggeredHoneypot,
  isPublicSubmissionRateLimited,
  normalizeSubmissionEmail,
  recordPublicSubmissionAttempt,
} from '@/lib/v2/public-write';
import { v2AppointmentCreateSchema } from '@/lib/v2/schemas';
import { zodErrorResponse } from '@/lib/v2/request';

export async function POST(request: NextRequest) {
  let meta = getPublicWriteMetaFromRequest(request);

  try {
    const body = await request.json();
    const email = normalizeSubmissionEmail(body.email);
    meta = getPublicWriteMetaFromRequest(request, email);

    if (hasTriggeredHoneypot(body.website)) {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'honeypot',
      });
      return NextResponse.json({ success: true }, { status: 202 });
    }

    if (await isPublicSubmissionRateLimited('appointment', meta)) {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'rate_limited',
      });
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    const payload = v2AppointmentCreateSchema.parse(body);
    const appointment = await createV2Appointment(payload);
    await recordPublicSubmissionAttempt({
      kind: 'appointment',
      meta,
      wasAccepted: true,
      reason: 'accepted',
    });

    return NextResponse.json(
      {
        success: true,
        id: appointment.id,
        referenceNumber: appointment.referenceNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'validation_failed',
      });
      return zodErrorResponse(error);
    }

    if (error instanceof Error && error.message === 'selected_slot_unavailable') {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'slot_unavailable',
      });
      return NextResponse.json({ error: 'Selected slot is no longer available' }, { status: 409 });
    }

    console.error('v2 appointment create failed', error);
    return NextResponse.json({ error: 'Appointment submission failed' }, { status: 500 });
  }
}
