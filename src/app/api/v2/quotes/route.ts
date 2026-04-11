import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createV2QuoteRequest } from '@/lib/v2/mutations';
import { v2QuoteCreateSchema } from '@/lib/v2/schemas';
import { zodErrorResponse } from '@/lib/v2/request';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = v2QuoteCreateSchema.parse(body);
    const quote = await createV2QuoteRequest(payload);

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
      return zodErrorResponse(error);
    }

    console.error('v2 quote create failed', error);
    return NextResponse.json({ error: 'Quote submission failed' }, { status: 500 });
  }
}
