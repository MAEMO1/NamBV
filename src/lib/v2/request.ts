import { NextResponse, type NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { getV2AdminUserFromRequest } from './auth';

export async function requireV2AdminRequest(request: NextRequest) {
  const user = await getV2AdminUserFromRequest(request);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { user, response: null };
}

export function zodErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      error: 'Validation failed',
      details: error.flatten(),
    },
    { status: 400 },
  );
}
