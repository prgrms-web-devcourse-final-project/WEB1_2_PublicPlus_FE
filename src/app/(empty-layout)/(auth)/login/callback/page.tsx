import { SocialProvider, useAuthStore } from '@/entities/User';
import { userService } from '@/entities/User/api/userService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LoginCallbackPage() {
  const router = useRouter();
  const { socialLogin } = useAuthStore();

  useEffect(() => {
    const handleSocialLoginCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      // 구글 고정 (URL 기반으로 provider 결정)
      const provider: SocialProvider = 'google';

      // state 검증 로직 추가
      const savedState = localStorage.getItem('oauth_state');
      if (state !== savedState) {
        toast.error('인증 상태가 일치하지 않습니다.');
        router.push('/login');
        return;
      }

      if (code) {
        try {
          const result = await userService.socialLoginCallback(
            provider, // provider 명시
            code
          );

          // 인증 스토어 업데이트
          if (result) {
            socialLogin(result);
            toast.success('로그인 성공');
            router.push('/');
          } else {
            throw new Error('로그인 정보를 받아오지 못했습니다.');
          }
        } catch (error) {
          console.error('소셜 로그인 에러:', error);

          // 더 구체적인 에러 메시지
          const errorMessage =
            error instanceof Error
              ? error.message
              : '소셜 로그인에 실패했습니다.';

          toast.error(errorMessage);
          router.push('/login');
        }
      }
    };

    handleSocialLoginCallback();
  }, [router, socialLogin]);

  return <div>로그인 처리 중...</div>;
}
