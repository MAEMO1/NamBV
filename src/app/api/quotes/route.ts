export { GET } from '@/app/api/public/quote-form/route';

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { sendAdminNotification } from '@/lib/email';
import { captureRouteException } from '@/lib/monitoring';
import { getV2QuoteFormOptions } from '@/lib/v2/public-data';
import { createV2QuoteRequest } from '@/lib/v2/mutations';
import {
  getPublicWriteMetaFromRequest,
  hasTriggeredHoneypot,
  isPublicSubmissionRateLimited,
  normalizeSubmissionEmail,
  recordPublicSubmissionAttempt,
} from '@/lib/v2/public-write';
import { zodErrorResponse } from '@/lib/v2/request';
import { v2QuoteCreateSchema } from '@/lib/v2/schemas';

const budgetRangeLabels: Record<string, string> = {
  UNDER_10K: '< EUR 10.000',
  RANGE_10K_25K: 'EUR 10.000 - EUR 25.000',
  RANGE_25K_50K: 'EUR 25.000 - EUR 50.000',
  RANGE_50K_100K: 'EUR 50.000 - EUR 100.000',
  OVER_100K: '> EUR 100.000',
  UNKNOWN: 'Nog niet bepaald',
};

async function sendQuoteNotifications(input: {
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  city?: string;
  propertyTypeId: string;
  serviceTypeIds: string[];
  description: string;
  budgetRange?: string;
  referenceNumber: string;
}) {
  try {
    const { serviceTypes, propertyTypes } = await getV2QuoteFormOptions();
    const propertyType = propertyTypes.find((item) => item.id === input.propertyTypeId)?.name;
    const services = input.serviceTypeIds.map((serviceTypeId) => (
      serviceTypes.find((item) => item.id === serviceTypeId)?.name ?? serviceTypeId
    ));

    const result = await sendAdminNotification('quote', {
      referenceNumber: input.referenceNumber,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      postalCode: input.postalCode,
      city: input.city,
      propertyType,
      services,
      description: input.description,
      budgetRange: input.budgetRange ? (budgetRangeLabels[input.budgetRange] ?? input.budgetRange) : undefined,
    });

    if (!result.success) {
      captureRouteException(new Error(result.error ?? 'quote admin notification failed'), {
        action: 'quote.notification.admin',
        route: '/api/quotes',
        extra: {
          referenceNumber: input.referenceNumber,
          recipient: 'ADMIN_EMAIL',
        },
      });
    }
  } catch (error) {
    captureRouteException(error, {
      action: 'quote.notification.admin',
      route: '/api/quotes',
      extra: {
        referenceNumber: input.referenceNumber,
      },
    });
  }
}

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
    await sendQuoteNotifications({
      ...payload,
      referenceNumber: quote.referenceNumber,
      city: payload.city || undefined,
      budgetRange: payload.budgetRange,
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

    captureRouteException(error, {
      action: 'quote.create',
      route: '/api/quotes',
    });

    return NextResponse.json({ error: 'Quote submission failed' }, { status: 500 });
  }
}
