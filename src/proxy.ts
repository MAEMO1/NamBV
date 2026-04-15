import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlProxy = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  return intlProxy(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
