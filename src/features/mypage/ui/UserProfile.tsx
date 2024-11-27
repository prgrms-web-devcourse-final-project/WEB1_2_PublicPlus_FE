import Image from 'next/image';
import { UserProfileProps } from '../types';

export const UserProfile = ({
  profileImage = '/jjang.jpeg',
  email,
  nickname
}: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-full">
        <Image
          width={120}
          height={120}
          src={profileImage}
          alt="프로필이미지"
          className="overflow-hidden rounded-full object-cover"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{nickname}</p>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  );
};
