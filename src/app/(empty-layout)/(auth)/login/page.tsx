'use client';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import useRedirect from '@/features/auth/hooks/useRedirect';
import LoginContainer from '@/features/auth/ui/LoginContainer';
import { useAuthStore } from '@/entities/User';

export default function LoginPage() {
  const { isAuthenticated, userId, tokens, kakaoLogin } = useAuthStore();

  useRedirect(isAuthenticated, userId, tokens);

  const handleKakaoLogin = async () => {
    try {
      // 상태(state) 생성 및 저장
      const state = window.btoa(crypto.randomUUID());
      localStorage.setItem('kakao_oauth_state', state);

      // 카카오 로그인 URL로 리다이렉트
      await kakaoLogin(state);
    } catch (error) {
      console.error(error);
      toast.error('카카오 로그인 실패');
    }
  };

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
      <LoginContainer />
      <div className="mb-8 mt-8 flex justify-center gap-4">
        <button
          onClick={handleKakaoLogin}
          className="rounded bg-[#FEE500] px-4 py-2 text-black">
          카카오 로그인
        </button>
      </div>
      <div className="text-sm text-primary-800">
        <Link href={'/signup'}>회원가입</Link>
      </div>
    </div>
  );
}
