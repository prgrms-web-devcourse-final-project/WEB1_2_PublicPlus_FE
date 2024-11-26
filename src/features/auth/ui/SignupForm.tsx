'use client';
import { useState } from 'react';
import { EmailInput } from './EmailInput';
import { VerificationInput } from './VerificationInput';
import { Button } from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter();

  const handleEmailSubmit = () => {
    router.push('/signup/password');
  };

  return (
    <div className="space-y-8">
      <EmailInput
        email={email}
        setEmail={setEmail}
      />
      <VerificationInput
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
      />
      <Button
        variant="line"
        size="lg"
        onclickHandler={handleEmailSubmit}
        fullWidth>
        다음 단계
      </Button>
    </div>
  );
}
