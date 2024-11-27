import { useEffect, useState } from 'react';

export function usePasswordValidation(
  password: string,
  passwordConfirm: string
) {
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호를 입력해주세요.';
    if (!/^[A-Za-z0-9]+$/.test(value))
      return '비밀번호는 영문과 숫자만 사용 가능합니다.';
    return '';
  };

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  useEffect(() => {
    if (passwordConfirm && password !== passwordConfirm) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmError('');
    }
  }, [password, passwordConfirm]);

  return { passwordError, confirmError };
}
