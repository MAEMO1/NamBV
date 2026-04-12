import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Legacy analytics ingestion removed. Use GTM/GA4 and v2 lead events.' },
    { status: 410 },
  );
}
