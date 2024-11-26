'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../stores/authStore';
import ErrorMessage from '@/components/common/ErrorMsg';

export default function LoginContainer() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Zustand의 login 메서드 직접 사용
      const success = await login(email, password);

      if (success) {
        // 로그인 성공 시 리다이렉트
        router.push('/');
      } else {
        // 로그인 실패 시 에러 상태 설정
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생', error);
      setError('로그인 중 예상치 못한 오류가 발생했습니다.');
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
      <div>{error && <ErrorMessage message={error} />}</div>
    </>
  );
}
