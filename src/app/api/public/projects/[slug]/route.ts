import { NextRequest, NextResponse } from 'next/server';
import { getV2ProjectBySlug } from '@/lib/v2/public-data';
import { normalizeV2Locale } from '@/lib/v2/locale';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const locale = normalizeV2Locale(request.nextUrl.searchParams.get('locale'));
  const { slug } = await params;
  const project = await getV2ProjectBySlug(slug, locale);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ locale, project });
}
