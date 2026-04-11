import { NextRequest, NextResponse } from 'next/server';
import { getV2PageSections } from '@/lib/v2/public-data';
import { normalizeV2Locale } from '@/lib/v2/locale';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> },
) {
  const { pageKey } = await params;
  const locale = normalizeV2Locale(request.nextUrl.searchParams.get('locale'));
  const sections = await getV2PageSections(pageKey, locale);

  return NextResponse.json({ pageKey, locale, sections });
}
