'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../../stores/authStore';
import LoginContainer from '@/features/auth/ui/LoginContainer';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, user, token } = useAuthStore();

  useEffect(() => {
    console.log('인증 상태:', {
      isAuthenticated,
      user,
      token
    });
    // 토큰과 사용자 정보 모두 존재할 때만 리다이렉트
    if (isAuthenticated && user && token) {
      router.push('/');
    }
  }, [isAuthenticated, user, token, router]);

  // 인증되지 않은 경우에만 로그인 페이지 렌더링
  if (isAuthenticated) {
    return null; // 또는 로딩 스피너
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link href={'/login'}>
        <Image
          width={90}
          height={50}
          src={'/icons/logo.png'}
          alt="공공플러스"
          className="mb-16"
        />
      </Link>

      <LoginContainer />

      <div className="mt-8 flex flex-col items-center">
        <div className="flex gap-4">
          {/* 소셜 로그인 버튼들 */}
          <button className="rounded-full p-2 hover:bg-gray-50">
            <Image
              width={40}
              height={40}
              alt="카카오톡"
              src={'/icons/kakaotalk.png'}
              className="transition-transform hover:scale-105"
            />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-50">
            <Image
              width={40}
              height={40}
              alt="구글"
              src={'/icons/google.png'}
              className="transition-transform hover:scale-105"
            />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-50">
            <Image
              width={40}
              height={40}
              alt="네이버"
              src={'/icons/naver.png'}
              className="transition-transform hover:scale-105"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
