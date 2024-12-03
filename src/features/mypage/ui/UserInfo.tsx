import { UserInfoCard } from '@/components/common/Cards/UserInfoCard';
import { useRouter } from 'next/navigation';
import { useUserQuery } from '@/entities/User/model/userQueries';

export const UserInfo = () => {
  const { data: userInfo } = useUserQuery();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <UserInfoCard
        title="내 소개글"
        buttonLabel={
          !userInfo?.description || userInfo.description === ''
            ? '작성하기'
            : '수정하기'
        }
        onClick={() => router.push('/profile/edit/description')}>
        <div className="my-2">
          <p className="text-xs text-gray-600">
            {!userInfo?.description || userInfo.description === ''
              ? '아직 작성되지 않았습니다.'
              : userInfo.description}
          </p>
        </div>
      </UserInfoCard>
    </div>
  );
};
