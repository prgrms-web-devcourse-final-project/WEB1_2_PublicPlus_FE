'use client';
import Image from 'next/image';
import { LogOut, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/User';
import { useUserQuery } from '@/entities/User/model/userQueries';

export const UserProfile = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { data: userInfo } = useUserQuery();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="relative flex h-[20vh] max-h-[300px] min-h-[240px] w-full items-center justify-center rounded-xl bg-primary-50">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="overflow-hidden rounded-full">
            <Image
              width={120}
              height={120}
              src={userInfo?.profile_image || '/jjang.jpeg'}
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
          <p className="text-lg font-semibold">{userInfo?.nickname}</p>
          <p className="text-sm text-gray-500">{userInfo?.email}</p>
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
