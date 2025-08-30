import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { authClient } from './lib/auth-client';

export async function middleware(request: NextRequest) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session && request.nextUrl.pathname !== '/login') {
    const loginUrl = new URL('/login', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  const posUrl = new URL('/pos', request.nextUrl.origin);
  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(posUrl);
  }

  if (session && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(posUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
