import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get('auth-storage')?.value;

  console.log('Pathname:', pathname);
  console.log('Auth Token:', authToken);

  // 인증이 필요한 경로
  const protectedPaths = ['/profile'];

  if (protectedPaths.includes(pathname) && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log('Pathname222222:', pathname);
  console.log('Auth Token222222222:', authToken);
  return NextResponse.next();
}

// 미들웨어가 적용될 경로
export const config = {
  matcher: ['/profile']
};
