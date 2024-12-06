'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUserQuery } from '@/entities/User/model/userQueries';
import { userService } from '@/entities/User/api/userService';

import EditLayout from '@/features/mypage/ui/EditLayout';
import {
  USER_NICKNAME_CONSTRAINTS,
  VALIDATION_MESSAGES
} from '@/features/mypage/model/constants/userProfile';

export default function NicknameEditPage() {
  const router = useRouter();
  const { data: userInfo } = useUserQuery();
  const [nickname, setNickname] = useState(userInfo?.nickname || '');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (!USER_NICKNAME_CONSTRAINTS.VALID_REGEX.test(nickname)) {
        setError(VALIDATION_MESSAGES.NICKNAME_INVALID);
        return;
      }

      if (userInfo?.userid) {
        await userService.updateNickname(userInfo.userid, nickname);
        router.push('/profile/edit');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '닉네임 변경에 실패했습니다.';
      setError(errorMessage);
    }
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
            onChange={e => {
              setNickname(e.target.value);
              setError('');
            }}
            className="input-form block w-full rounded-md border-gray-300 p-4 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="닉네임을 입력해주세요"
          />
        </label>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        <ul className="space-y-4 text-xs text-gray-500">
          <li>2-10자까지 입력가능합니다.</li>
          <li>한글, 숫자, 영문 소문자만 입력가능합니다.</li>
        </ul>
      </div>
    </EditLayout>
  );
}
