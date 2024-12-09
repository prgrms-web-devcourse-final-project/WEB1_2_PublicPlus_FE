import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { userService } from '@/entities/User/api/userService';
import { useCountdown } from '@/features/auth/hooks/useCountdown';
import { emailService } from '@/entities/User/api/emailService';
import { useUserQuery } from '@/entities/user/model/userQueries';
import { validatePassword } from '@/features/auth/Lib/Validation';

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
    startTimer();

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
      setStep('newPassword');
      stopTimer();
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
    if (!userInfo?.userid) {
      setError('사용자 정보를 찾을 수 없습니다');
      return false;
    }

    try {
      await userService.changePassword(userInfo.userid, {
        email: email,
        changePassword: password,
        checkChangePassword: checkPassword
      });

      router.push('/login');
      return true;
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data.message || '비밀번호 변경에 실패했습니다'
          : '비밀번호 변경에 실패했습니다'
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
    handlePasswordChange,
    remainingTime,
    timerActive,
    formatTime
  };
};
