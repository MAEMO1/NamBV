import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // === ADMIN ROUTES: Skip i18n, auth is enforced in route handlers/layouts ===
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // === API ROUTES: Skip i18n ===
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // === PUBLIC ROUTES: Apply i18n middleware ===
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|admin-v2|v2|.*\\..*).*)'],
};
