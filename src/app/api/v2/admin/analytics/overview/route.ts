import { NextRequest, NextResponse } from 'next/server';
import { getV2AnalyticsOverview } from '@/lib/v2/public-data';
import { requireV2AdminRequest } from '@/lib/v2/request';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const overview = await getV2AnalyticsOverview();
  return NextResponse.json(overview);
}
