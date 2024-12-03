import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get('auth-storage');

  // 공개 경로 정의
  const publicPaths = ['/login', '/'];

  // 인증이 필요한 경로
  const protectedPaths = ['/profile'];

  if (publicPaths.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (protectedPaths.includes(pathname) && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로
export const config = {
  matcher: ['/login', '/profile']
};
