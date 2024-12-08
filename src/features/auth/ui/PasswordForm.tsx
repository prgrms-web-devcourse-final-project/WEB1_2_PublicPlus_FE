'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PasswordField } from './PasswordField';
import { PasswordConfirmField } from './PasswordConfirmField';
import { Button } from '@/shared/ui/components/button/Button';
import { usePasswordValidation } from '../hooks/usePasswordValidation';

export function PasswordForm() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();

  const { passwordError, confirmError } = usePasswordValidation(
    password,
    passwordConfirm
  );

  const handleSubmit = () => {
    router.push('/signup/nickname');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm">이메일</label>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className="flex-1 rounded border p-3"
          />
        </div>
      </div>
      <PasswordField
        password={password}
        setPassword={setPassword}
        error={passwordError}
      />
      <PasswordConfirmField
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
        error={confirmError}
      />
      <Button
        variant="line"
        fullWidth
        size="lg"
        onClick={handleSubmit}
        // disabled={!!passwordError || !!confirmError}
      >
        다음 단계
      </Button>
    </div>
  );
}
