'use client';

import { userService } from '@/entities/user/api/userService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { code, provider } = router.query;

    const performOAuthLogin = async () => {
      try {
        if (provider) {
          const result = await userService.handleOAuthCallback(provider);

          // 토큰 저장
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('refresh_token', result.refresh_token);

          // 로그인 후 리다이렉트
          router.push('/dashboard');
        }
      } catch (error) {
        // 에러 처리
        console.error(error);
        router.push('/login');
      }
    };

    if (code && provider) {
      performOAuthLogin();
    }
  }, [router.query]);

  return <div>로그인 처리 중...</div>;
}
