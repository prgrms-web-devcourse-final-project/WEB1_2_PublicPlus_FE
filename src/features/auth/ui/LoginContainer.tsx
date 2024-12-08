'use client';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user';
import ErrorMessage from '@/shared/ui/components/Error/ErrorMsg';
import { requestNotificationPermission } from '@/shared/lib/firebase';

export default function LoginContainer() {
  const router = useRouter();
  const { login, error: storeError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  // FCM 토큰 자동 발급 로직
  useEffect(() => {
    const getFcmToken = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          setFcmToken(token);
        }
      } catch (error) {
        console.error('FCM 토큰 발급 실패', error);
      }
    };

    getFcmToken();
  }, []);

  const handleLogin = async () => {
    const success = await login({
      email,
      password,
      fcmToken,
      passwordEmpty: true
    });

    if (success) {
      // 로그인 성공 시 리다이렉트
      router.push('/');
    }
  };

  return (
    <>
      <div className="mx-auto mb-12 max-w-xl">
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
        />
      </div>
      <div>{storeError && <ErrorMessage message={storeError} />}</div>
    </>
  );
}
