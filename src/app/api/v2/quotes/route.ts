import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createV2QuoteRequest } from '@/lib/v2/mutations';
import {
  getPublicWriteMetaFromRequest,
  hasTriggeredHoneypot,
  isPublicSubmissionRateLimited,
  normalizeSubmissionEmail,
  recordPublicSubmissionAttempt,
} from '@/lib/v2/public-write';
import { v2QuoteCreateSchema } from '@/lib/v2/schemas';
import { zodErrorResponse } from '@/lib/v2/request';

export async function POST(request: NextRequest) {
  let meta = getPublicWriteMetaFromRequest(request);

  try {
    const body = await request.json();
    const email = normalizeSubmissionEmail(body.email);
    meta = getPublicWriteMetaFromRequest(request, email);

    if (hasTriggeredHoneypot(body.website)) {
      await recordPublicSubmissionAttempt({
        kind: 'quote',
        meta,
        wasAccepted: false,
        reason: 'honeypot',
      });
      return NextResponse.json({ success: true }, { status: 202 });
    }

    if (await isPublicSubmissionRateLimited('quote', meta)) {
      await recordPublicSubmissionAttempt({
        kind: 'quote',
        meta,
        wasAccepted: false,
        reason: 'rate_limited',
      });
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    const payload = v2QuoteCreateSchema.parse(body);
    const quote = await createV2QuoteRequest(payload);
    await recordPublicSubmissionAttempt({
      kind: 'quote',
      meta,
      wasAccepted: true,
      reason: 'accepted',
    });

    return NextResponse.json(
      {
        success: true,
        id: quote.id,
        referenceNumber: quote.referenceNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      await recordPublicSubmissionAttempt({
        kind: 'quote',
        meta,
        wasAccepted: false,
        reason: 'validation_failed',
      });
      return zodErrorResponse(error);
    }

    console.error('v2 quote create failed', error);
    return NextResponse.json({ error: 'Quote submission failed' }, { status: 500 });
  }
}
