import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Legacy auth alias removed. Use /api/admin/session.' }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: 'Legacy auth alias removed. Use /api/admin/session.' }, { status: 410 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Legacy auth alias removed. Use /api/admin/session.' }, { status: 410 });
}
