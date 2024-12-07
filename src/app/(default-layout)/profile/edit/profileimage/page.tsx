'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserQuery } from '@/entities/User/model/userQueries';
import { Plus } from 'lucide-react';
import EditLayout from '@/features/mypage/ui/EditLayout';
import { userService } from '@/entities/User/api/userService';

export default function ProfileImageEditPage() {
  const router = useRouter();
  const { data: userInfo } = useUserQuery();
  const [imageUrl, setImageUrl] = useState(userInfo?.profile_image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('선택된 이미지가 없습니다.');
      return;
    }

    try {
      await userService.updateProfileImage(
        userInfo?.userid || '',
        selectedFile
      );

      alert('프로필 이미지가 성공적으로 변경되었습니다.');
      router.push('/profile/edit');
    } catch (error) {
      alert(
        error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.'
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('5MB 이하의 이미지만 업로드 가능합니다.');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.');
        return;
      }

      setSelectedFile(file);

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
      isValid={!!selectedFile}>
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
