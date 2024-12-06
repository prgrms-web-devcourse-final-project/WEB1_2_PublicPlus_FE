'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUserQuery } from '@/entities/User/model/userQueries';
import { userService } from '@/entities/User/api/userService';

import EditLayout from '@/features/mypage/ui/EditLayout';
import { USER_DESCRIPTION_CONSTRAINTS } from '@/features/mypage/model/constants/userProfile';

export default function DescriptionEditPage() {
  const router = useRouter();
  const { data: userInfo } = useUserQuery();
  const [description, setDescription] = useState(userInfo?.description ?? '');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (userInfo?.userid) {
        await userService.updateDescription(userInfo.userid, description);
        router.push('/profile/edit');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '소개글 변경에 실패했습니다.';
      setError(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= USER_DESCRIPTION_CONSTRAINTS.MAX_LENGTH) {
      setDescription(value);
      setError(''); // 입력 시 에러 초기화
    }
  };

  return (
    <EditLayout
      onSubmit={handleSubmit}
      isValid={description.length > 0}>
      <div>
        <div className="mb-6 text-m font-medium text-gray-700">소개글</div>
        <textarea
          value={description}
          onChange={handleChange}
          className="input-form mt-1 block h-32 w-full resize-none rounded-md border-gray-300 p-4 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="자기 소개글을 입력해주세요."
        />
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        <div className="mt-2 text-right text-sm text-gray-500">
          {description.length}/{USER_DESCRIPTION_CONSTRAINTS.MAX_LENGTH}자
        </div>
      </div>
    </EditLayout>
  );
}
