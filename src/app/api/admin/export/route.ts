import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Legacy export endpoint removed in v2 cutover.' }, { status: 410 });
}
