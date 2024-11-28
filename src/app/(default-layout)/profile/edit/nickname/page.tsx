'use client';
import EditLayout from '@/features/mypage/ui/EditLayout';
import { useState } from 'react';

export default function NicknameEditPage() {
  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    // 닉네임 저장 로직
    alert('저장되었습니다.');
  };

  return (
    <EditLayout
      onSubmit={handleSubmit}
      isValid={nickname.length > 0}>
      <div className="space-y-8">
        <label>
          <div className="mb-6 text-m font-medium text-gray-700">닉네임</div>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            className="input-form block w-full rounded-md border-gray-300 p-4 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="닉네임을 입력해주세요"
          />
        </label>
        <ul className="space-y-4 text-xs text-gray-500">
          <li>2-10자까지 입력가능합니다.</li>
          <li>한글, 숫자, 영문 소문자만 입력가능합니다.</li>
        </ul>
      </div>
    </EditLayout>
  );
}
