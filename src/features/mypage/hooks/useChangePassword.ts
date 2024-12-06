import { useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { validatePassword } from '@/features/auth/utils/validation';
import { useUserQuery } from '@/entities/User/model/userQueries';
import { emailService } from '@/entities/User/api/emailService';

export const useChangePassword = (router: AppRouterInstance) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [checkPassword, setCheckPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'email' | 'verification' | 'newPassword'>(
    'email'
  );
  const [error, setError] = useState('');

  const { data: userInfo } = useUserQuery();

  useEffect(() => {
    if (userInfo?.email) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  // 이메일 인증
  const handleEmailSubmit = async () => {
    if (!email) {
      setError('유효한 이메일 주소를 입력해주세요');
      return false;
    }

    setStep('verification');
    try {
      await emailService.sendCode(email);
      setError('');
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '이메일 인증 코드 발송에 실패했습니다'
      );
      return false;
    }
  };

  // 인증 코드 검증
  const handleVerificationSubmit = async () => {
    try {
      await emailService.verifyCode(email, verificationCode);
      setStep('newPassword');
      setError('');
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '인증 과정에 오류가 발생했습니다'
      );
      return false;
    }
  };

  const handlePasswordChange = async () => {
    if (password !== checkPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return false;
    }

    if (!validatePassword(password)) {
      setError('비밀번호는 최소 6자, 영문, 숫자를 포함해야 합니다');
      return false;
    }

    try {
      const response = await fetch(`/api/user/password/${userInfo?.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          changePassword: password,
          checkChangePassword: checkPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '변경 실패');
      }

      router.push('/login');
      return true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다'
      );
      return false;
    }
  };

  return {
    email,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    verificationCode,
    setVerificationCode,
    step,
    setStep,
    error,
    handleEmailSubmit,
    handleVerificationSubmit,
    handlePasswordChange
  };
};
