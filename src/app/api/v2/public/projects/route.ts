import { NextRequest, NextResponse } from 'next/server';
import { getV2Projects } from '@/lib/v2/public-data';
import { normalizeV2Locale } from '@/lib/v2/locale';

export async function GET(request: NextRequest) {
  const locale = normalizeV2Locale(request.nextUrl.searchParams.get('locale'));
  const projects = await getV2Projects(locale);

  return NextResponse.json({ locale, projects });
}
