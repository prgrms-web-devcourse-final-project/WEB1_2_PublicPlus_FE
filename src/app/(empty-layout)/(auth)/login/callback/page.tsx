import { useAuthStore } from '@/entities/User';
import { userService } from '@/entities/User/api/userService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LoginCallbackPage() {
  const router = useRouter();
  const { socialLoginComplete } = useAuthStore();

  useEffect(() => {
    const handleSocialLoginCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const provider = urlParams.get('provider');

      const savedState = localStorage.getItem(`oauth_state_${provider}`);
      if (!state || state !== savedState) {
        toast.error('인증 상태가 일치하지 않습니다.');
        router.push('/login');
        return;
      }

      if (!code || !provider) {
        toast.error('유효하지 않은 인증 정보입니다.');
        router.push('/login');
        return;
      }

      try {
        const result = await userService.socialLoginCallback({
          provider,
          code,
          state
        });

        if (result) {
          await socialLoginComplete(result);
          toast.success('로그인 성공');

          // 로컬 스토리지 상태 초기화
          localStorage.removeItem(`oauth_state_${provider}`);

          router.push('/');
        } else {
          throw new Error('로그인 정보를 받아오지 못했습니다.');
        }
      } catch (error) {
        console.error('소셜 로그인 에러:', error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : '소셜 로그인에 실패했습니다.';

        toast.error(errorMessage);
        router.push('/login');
      }
    };

    handleSocialLoginCallback();
  }, [router, socialLoginComplete]);

  return <div>로그인 처리 중...</div>;
}
