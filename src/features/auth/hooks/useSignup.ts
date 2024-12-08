import axios from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import { userService } from '@/entities/user/api/userService';
import { useCountdown } from '@/features/auth/hooks/useCountdown';
import { emailService } from '@/entities/user/api/emailService';
import {
  validateEmail,
  validatePassword,
  validateNickname
} from '../lib/Validation';

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

  const {
    remainingTime,
    isActive: timerActive,
    start: startTimer,
    stop: stopTimer,
    formatTime
  } = useCountdown({
    initialTime: 180,
    onComplete: () => {
      setError('인증 시간이 만료되었습니다. 다시 인증코드를 요청해주세요.');
      setStep('email');
    }
  });

  const handleEmailSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요');
      return false;
    }

    try {
      await emailService.sendCode(email);
      setStep('verification');
      startTimer();
      setError('');
      return true;
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message ||
              '이메일 인증 코드 발송에 실패했습니다'
          : '이메일 인증 코드 발송에 실패했습니다'
      );
      stopTimer();
      return false;
    }
  };

  const handleVerificationSubmit = async () => {
    if (remainingTime <= 0) {
      setError('인증 시간이 만료되었습니다. 다시 인증코드를 요청해주세요.');
      return false;
    }

    try {
      await emailService.verifyCode(email, verificationCode);
      setStep('details');
      stopTimer();
      setError('');
      return true;
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || '인증 실패'
          : '알 수 없는 오류가 발생했습니다'
      );
      return false;
    }
  };

  const handleSignup = async () => {
    if (password !== checkPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return false;
    }

    if (!validatePassword(password)) {
      setError('비밀번호는 최소 6자, 영문, 숫자를 포함해야 합니다');
      return false;
    }

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
      alert('회원가입 되었습니다.');
      router.push('/login');
      return true;
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || '회원가입에 실패했습니다'
          : '회원가입에 실패했습니다'
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
    handleSignup,
    remainingTime,
    timerActive,
    formatTime
  };
};
