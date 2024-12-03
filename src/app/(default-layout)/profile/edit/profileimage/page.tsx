'use client';
import EditLayout from '@/features/mypage/ui/EditLayout';
import { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useUserQuery } from '@/entities/User/model/userQueries';

export default function ProfileImageEditPage() {
  const { data: userInfo } = useUserQuery();
  const [imageUrl, setImageUrl] = useState(userInfo?.profile_image);

  const handleSubmit = () => {
    // 프로필 이미지 저장 로직
    alert('이미지가 저장되었습니다.');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <EditLayout
      onSubmit={handleSubmit}
      isValid={true}>
      <div>
        <div className="mb-8 text-m font-medium text-gray-700">프로필 사진</div>
        <div className="flex items-center space-x-6">
          <div className="relative h-40 w-40 overflow-hidden rounded-xl">
            <Image
              src={
                imageUrl || userInfo?.profile_image || '/icons/default_user.svg'
              }
              alt="프로필 이미지"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
            <Plus className="mb-2 h-8 w-8 text-gray-400" />
            <div className="text-xs text-gray-400">이미지 등록</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </EditLayout>
  );
}
