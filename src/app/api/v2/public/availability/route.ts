import { NextRequest, NextResponse } from 'next/server';
import { getV2Availability } from '@/lib/v2/public-data';

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get('month') ?? undefined;
  const availability = await getV2Availability(month);

  return NextResponse.json({ availability });
}
