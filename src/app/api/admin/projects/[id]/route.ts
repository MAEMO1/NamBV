import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Project item route removed. Use /api/admin/projects.' }, { status: 410 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Project item route removed. Use /api/admin/projects.' }, { status: 410 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Project item route removed. Use /api/admin/projects.' }, { status: 410 });
}
