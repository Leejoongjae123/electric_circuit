import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 루트 경로로 접속하면 /circuit으로 리다이렉트
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/circuit', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
