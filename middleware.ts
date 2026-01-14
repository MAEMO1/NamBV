import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';

const SESSION_COOKIE_NAME = 'nam_admin_session';

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // === ADMIN ROUTES: Skip i18n, apply auth ===
  if (pathname.startsWith('/admin')) {
    // Auth check for admin (except login page)
    if (pathname !== '/admin/login') {
      const session = request.cookies.get(SESSION_COOKIE_NAME);
      if (!session?.value) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // Redirect logged-in users from login to dashboard
    if (pathname === '/admin/login') {
      const session = request.cookies.get(SESSION_COOKIE_NAME);
      if (session?.value) {
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
  matcher: ['/((?!api|_next|admin|.*\\..*).*)'],
};
