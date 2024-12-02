import { Tag } from '@/components/common/Tag';
import { UserInfoCard } from '@/components/common/Cards/UserInfoCard';
import { useRouter } from 'next/navigation';
import { UserInformation } from '../types';

export const UserInfo = ({ description = '' }: UserInformation) => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <UserInfoCard
        title="내 소개글"
        buttonLabel={
          !description || description === '' ? '작성하기' : '수정하기'
        }
        onClick={() => router.push('/profile/edit/description')}>
        <div className="my-2">
          <p className="text-xs text-gray-600">
            {!description || description === ''
              ? '아직 작성되지 않았습니다.'
              : description}
          </p>
        </div>
      </UserInfoCard>

      <UserInfoCard
        title="관심 운동"
        onClick={() => alert('관심운동 구현한다면 추가될 예정입니다.')}>
        <div className="my-2 flex flex-wrap gap-2">
          <Tag
            label="🏋️ 웨이트 트레이닝"
            variant="line"
          />
          <Tag
            label="🚴 사이클링"
            variant="line"
          />
          <Tag
            label="🧘 요가"
            variant="line"
          />
        </div>
      </UserInfoCard>
    </div>
  );
};
