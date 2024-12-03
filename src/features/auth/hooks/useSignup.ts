import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { useState } from 'react';
import { userService } from '@/entities/User/api/userService';
import {
  validateEmail,
  validateNickname,
  validatePassword
} from '../utils/validation';

export const useSignup = (router: AppRouterInstance) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'email' | 'verification' | 'details'>(
    'email'
  );
  const [error, setError] = useState('');

  const handleEmailSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요');
      return false;
    }

    try {
      await fetch(`/api/email?email=${encodeURIComponent(email)}`, {
        method: 'POST'
      });
      setStep('verification');
      setError('');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('이메일 인증 코드 발송에 실패했습니다');
      }
      return false;
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      const response = await fetch(
        `/api/email?email=${email}&code=${verificationCode}`,
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error('인증 실패');
      }

      setStep('details');
      setError('');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다');
      }
      return false;
    }
  };

  const handleSignup = async () => {
    // 비밀번호 일치 검사
    if (password !== checkPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return false;
    }

    // 비밀번호 강도 검사
    if (!validatePassword(password)) {
      setError('비밀번호는 최소 6자, 영문, 숫자를 포함해야 합니다');
      return false;
    }

    // 닉네임 길이 검사
    if (!validateNickname(nickname)) {
      setError('닉네임은 2-10자 사이여야 합니다');
      return false;
    }

    try {
      const joinData = {
        email,
        password,
        checkPassword,
        nickname
      };

      await userService.join(joinData);
      await userService.login({ email, password });
      router.push('/');
      return true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : '회원가입에 실패했습니다'
      );
      return false;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    nickname,
    setNickname,
    verificationCode,
    setVerificationCode,
    step,
    setStep,
    error,
    handleEmailSubmit,
    handleVerificationSubmit,
    handleSignup
  };
};
