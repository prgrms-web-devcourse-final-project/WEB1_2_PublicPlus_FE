'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/entities/User';

export default function LoginCallbackPage() {
  const router = useRouter();
  const { socialLoginComplete } = useAuthStore();

  useEffect(() => {
    const handleKakaoLoginCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      const userId = urlParams.get('userId');

      // 토큰 유효성 검사
      if (!accessToken || !refreshToken || !userId) {
        toast.error('유효하지 않은 로그인 정보입니다.');
        router.push('/login');
        return;
      }

      try {
        const loginResult = {
          authentication: 'Bearer',
          access_token: accessToken,
          refresh_token: refreshToken,
          userId
        };

        // 소셜 로그인 완료 처리
        await socialLoginComplete(loginResult);

        localStorage.removeItem('kakao_oauth_state');
        toast.success('카카오 로그인 성공');
        router.push('/');
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
        toast.error(
          error instanceof Error ? error.message : '카카오 로그인 실패'
        );
        router.push('/login');
      }
    };

    handleKakaoLoginCallback();
  }, [router, socialLoginComplete]);

  return <div>로그인 처리 중...</div>;
}
