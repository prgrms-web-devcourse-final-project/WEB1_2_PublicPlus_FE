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

      const savedState = localStorage.getItem('oauth_state');
      if (state !== savedState) {
        toast.error('인증 상태가 일치하지 않습니다.');
        router.push('/login');
        return;
      }

      if (code) {
        try {
          const result = await userService.socialLoginCallback('google', code);

          // 로그인 완료 처리
          if (result) {
            await socialLoginComplete(result);
            toast.success('로그인 성공');
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
      }
    };

    handleSocialLoginCallback();
  }, [router]);

  return <div>로그인 처리 중...</div>;
}
