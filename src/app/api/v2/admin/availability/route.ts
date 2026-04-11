import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { defaultAvailabilityRules } from '@/lib/v2/defaults';
import { replaceV2Availability } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AvailabilityPayloadSchema } from '@/lib/v2/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const [rules, exceptions] = await Promise.all([
    db.v2AvailabilityRule.findMany({ orderBy: { dayOfWeek: 'asc' } }),
    db.v2AvailabilityException.findMany({ orderBy: { date: 'asc' } }),
  ]);

  return NextResponse.json({
    rules: rules.length > 0 ? rules : defaultAvailabilityRules,
    exceptions,
  });
}

export async function PUT(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2AvailabilityPayloadSchema.parse(body);
    await replaceV2Availability(payload, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    console.error('v2 availability replace failed', error);
    return NextResponse.json({ error: 'Availability update failed' }, { status: 500 });
  }
}
