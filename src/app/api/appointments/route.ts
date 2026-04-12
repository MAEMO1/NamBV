import { NextResponse } from 'next/server';

export { POST } from '@/app/api/v2/appointments/route';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Use GET /api/public/availability for public availability and GET /api/admin/appointments for admin data.',
    },
    { status: 405 },
  );
}
