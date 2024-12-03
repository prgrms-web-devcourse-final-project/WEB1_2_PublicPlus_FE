'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginContainer from '@/features/auth/ui/LoginContainer';
import { useAuthStore } from '@/entities/User';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, userId, tokens } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && userId && tokens.access_token) {
      router.push('/');
    }
  }, [isAuthenticated, userId, tokens.access_token, router]);

  // 인증되지 않은 경우에만 로그인 페이지 렌더링
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="item-center flex min-h-[80vh] flex-col justify-center space-y-16 text-center">
      <section className="mx-auto w-[30%]">
        <Link href={'/'}>
          <Image
            width={60}
            height={40}
            src={'/icons/logo.png'}
            alt="공공플러스"
            className="my-28 w-full"
          />
        </Link>
      </section>
      <section>
        <LoginContainer />
        <div className="mb-8 mt-8 flex flex-col items-center">
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
        <div className="text-sm text-primary-800">
          <Link href={'/signup'}>회원가입</Link>
        </div>
      </section>
    </div>
  );
}
