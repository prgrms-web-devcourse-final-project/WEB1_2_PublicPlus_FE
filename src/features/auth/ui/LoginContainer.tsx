'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/common/ErrorMsg';
import { useAuthStore } from '@/entities/User';

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
      <div className="mb-12">
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
