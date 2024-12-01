'use client';
import Image from 'next/image';
import { LogOut, Pencil } from 'lucide-react';
import { UserProfileProps } from '../types';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/User';

export const UserProfile = ({
  profileImage = '/jjang.jpeg',
  email,
  nickname
}: UserProfileProps) => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Zustand 스토어의 로그아웃 메서드 호출
    router.push('/login'); // 로그인 페이지로 리다이렉트
  };

  return (
    <div className="relative flex h-[20vh] max-h-[300px] min-h-[240px] w-full items-center justify-center rounded-xl bg-primary-50">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="overflow-hidden rounded-full">
            <Image
              width={120}
              height={120}
              src={profileImage}
              alt="프로필이미지"
              className="overflow-hidden rounded-full object-cover"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 h-12 w-12 rounded-full bg-gray-50 p-2 shadow-md hover:bg-primary-100"
            onClick={() => router.push('/profile/edit')}>
            <Pencil
              size={20}
              color="gray"
              className="h-full w-full"
            />
          </button>
        </div>
        <div className="space-y-4 text-center">
          <p className="text-lg font-semibold">{nickname}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="absolute right-4 top-4 rounded-lg border border-gray-300 p-2 text-sm text-gray-400 hover:border-gray-700 hover:text-gray-700">
        <LogOut width={20} />
      </button>
    </div>
  );
};
