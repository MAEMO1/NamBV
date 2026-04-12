import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Legacy media library removed. Use /api/admin/assets.' }, { status: 410 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Legacy media library removed. Use /api/admin/assets.' }, { status: 410 });
}
