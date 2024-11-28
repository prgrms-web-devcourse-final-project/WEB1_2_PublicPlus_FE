// profile/edit.tsx
'use client';
import { CustomHeader } from '@/components/common/Header/CustomHeader';
import { EditCard } from '@/components/common/Cards/EditCard';
import { useRouter } from 'next/navigation';

export default function ProfileEditPage() {
  const router = useRouter();

  return (
    <div>
      <CustomHeader />

      <div>
        <div className="flex flex-col space-y-8">
          <EditCard
            title="프로필 사진"
            image={{
              src: '/jjang.jpeg',
              alt: '프로필 이미지'
            }}
            onClick={() => router.push('/profile/edit/profileimage')}
          />
          <EditCard
            title="닉네임"
            description="아직 작성되지 않았습니다."
            onClick={() => router.push('/profile/edit/nickname')}
          />
          <EditCard
            title="소개글"
            description="아직 작성되지 않았습니다."
            onClick={() => router.push('/profile/edit/description')}
          />
          <EditCard
            title="관심 운동"
            description="아직 등록된 관심 운동이 없습니다."
            onClick={() => router.push('/profile/edit/interests')}
          />
          <EditCard
            title="즐겨찾는 체육 시설"
            description="아직 즐겨찾기한 시설이 없습니다."
            onClick={() => router.push('/profile/edit/favorites')}
          />
        </div>
      </div>
    </div>
  );
}
