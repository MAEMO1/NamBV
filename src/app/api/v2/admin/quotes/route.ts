import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireV2AdminRequest } from '@/lib/v2/request';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const quotes = await db.v2QuoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ quotes });
}
