'use client';
import { CustomHeader } from '@/components/common/Header/CustomHeader';
import { EditCard } from '@/components/common/Cards/EditCard';
import { useRouter } from 'next/navigation';
import { useUserQuery } from '@/entities/User/model/userQueries';

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: userInfo } = useUserQuery();

  return (
    <div>
      <CustomHeader />

      <div>
        <div className="flex flex-col space-y-8">
          <EditCard
            title="프로필 사진"
            image={{
              src: userInfo?.profile_image || '/icons/default_user.svg',
              alt: '프로필 이미지'
            }}
            onClick={() => router.push('/profile/edit/profileimage')}
          />
          <EditCard
            title="닉네임"
            description={userInfo?.nickname || '아직 작성되지 않았습니다.'}
            onClick={() => router.push('/profile/edit/nickname')}
          />
          <EditCard
            title="소개글"
            description={userInfo?.description || '아직 작성되지 않았습니다.'}
            onClick={() => router.push('/profile/edit/description')}
          />
        </div>
      </div>
    </div>
  );
}
