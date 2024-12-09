'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/entities/User';
import { userService } from '@/entities/User/api/userService';

export default function LoginCallbackPage() {
  const router = useRouter();
  const { socialLoginComplete } = useAuthStore();

  useEffect(() => {
    const handleKakaoLoginCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      // state 검증
      const savedState = localStorage.getItem('kakao_oauth_state');
      if (!state || state !== savedState) {
        toast.error('인증 상태가 일치하지 않습니다.');
        router.push('/login');
        return;
      }

      if (!code) {
        toast.error('유효하지 않은 인증 정보입니다.');
        router.push('/login');
        return;
      }

      try {
        const result = await userService.kakaoLoginCallback(code, state);
        await socialLoginComplete(result);

        // state 제거
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
