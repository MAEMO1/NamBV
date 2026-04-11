import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';
import {
  LEGACY_ADMIN_SESSION_COOKIE,
  verifyLegacyAdminSessionToken,
} from './src/lib/legacy-session';

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // === ADMIN ROUTES: Skip i18n, apply auth ===
  if (pathname.startsWith('/admin')) {
    const sessionValue = request.cookies.get(LEGACY_ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyLegacyAdminSessionToken(sessionValue);

    // Auth check for admin (except login page)
    if (pathname !== '/admin/login') {
      if (!session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // Redirect logged-in users from login to dashboard
    if (pathname === '/admin/login') {
      if (session) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

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
