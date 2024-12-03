'use client';
import { useUserQuery } from '@/entities/User/model/userQueries';
import EditLayout from '@/features/mypage/ui/EditLayout';
import { useState } from 'react';

const MAX_LENGTH = 50;

export default function DescriptionEditPage() {
  const { data: userInfo } = useUserQuery();
  const [description, setDescription] = useState(userInfo?.description ?? '');

  const handleSubmit = () => {
    // 소개글 저장 로직
    alert('저장되었습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setDescription(value);
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
        <div className="mt-2 text-right text-sm text-gray-500">
          {description.length}/{MAX_LENGTH}자
        </div>
      </div>
    </EditLayout>
  );
}
