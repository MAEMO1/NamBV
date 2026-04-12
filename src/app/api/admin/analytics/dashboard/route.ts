import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Legacy analytics dashboard removed. Use /api/admin/analytics/overview.' }, { status: 410 });
}
