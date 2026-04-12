import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Quote notes route removed. Use PATCH /api/admin/quotes/[id].' }, { status: 410 });
}
