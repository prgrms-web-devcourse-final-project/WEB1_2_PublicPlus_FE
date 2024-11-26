'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button/Button';

export function NicknameForm() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/signup/complete');
  };

  return (
    <div className="space-y-8">
      <input
        type="text"
        placeholder="입력해주세요."
        className="w-full rounded border p-3"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />

      <div className="space-y-4 text-xs text-gray-600">
        <p>2-10자까지 입력가능합니다.</p>
        <p>한글, 숫자, 영문 소문자만 입력가능합니다.</p>
        <p>변경하시면 30일 후 재변경이 가능합니다.</p>
      </div>

      <Button
        fullWidth
        onclickHandler={handleSubmit}>
        회원가입 완료
      </Button>
    </div>
  );
}
