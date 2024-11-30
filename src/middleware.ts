import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('미들');
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get('auth-storage');

  // 공개 경로 정의
  const publicPaths = ['/login', '/'];

  // 인증이 필요한 경로
  const protectedPaths = ['/profile'];

  // 이미 로그인된 상태에서 로그인/회원가입 페이지 접근 방지
  if (publicPaths.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 로그인하지 않은 상태에서 보호된 경로 접근 시 로그인 페이지로 리다이렉트
  if (protectedPaths.includes(pathname) && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 구성
export const config = {
  matcher: ['/login', '/profile']
};
