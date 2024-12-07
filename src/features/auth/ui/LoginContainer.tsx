'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user';
import ErrorMessage from '@/shared/ui/components/Error/ErrorMsg';

export default function LoginContainer() {
  const router = useRouter();
  const { login, error: storeError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login({ email, password });

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
