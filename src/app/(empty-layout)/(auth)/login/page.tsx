'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { SocialProvider, useAuthStore } from '@/entities/User';
import useRedirect from '@/features/auth/hooks/useRedirect';

import { SOCIAL_PROVIDERS } from '@/features/auth/model/constants';
import { SocialLoginButton } from '@/features/auth/ui/SocialLoginButton';
import LoginContainer from '@/features/auth/ui/LoginContainer';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, userId, tokens, socialLogin } = useAuthStore();

  useRedirect(isAuthenticated, userId, tokens);
  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      const success = await socialLogin(provider);

      if (success) {
        toast.success('로그인 되었습니다.');
        // alert('로그인 되었습니다.');
        router.push('/');
      }
    } catch (error) {
      console.error('소셜 로그인 실패', error);
    }
  };
  const SocialLoginButtons = () => (
    <div className="mb-8 mt-8 flex justify-center gap-4">
      {SOCIAL_PROVIDERS.map(provider => (
        <SocialLoginButton
          key={provider.name}
          provider={provider}
          onLogin={handleSocialLogin}
        />
      ))}
    </div>
  );

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
      <SocialLoginButtons />
      <div className="text-sm text-primary-800">
        <Link href={'/signup'}>회원가입</Link>
      </div>
    </div>
  );
}
