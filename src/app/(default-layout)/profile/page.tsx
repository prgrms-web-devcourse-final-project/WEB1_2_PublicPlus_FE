import { UserProfile } from '@/features/mypage/ui/UserProfile';
import { MypageTap } from '@/features/mypage/ui/MypageTap';

export default function ProfilePage() {
  // 실제 사용자 데이터 API나 상태관리에서 가져올 예정
  const userData = {
    email: 'user@example.com',
    nickname: '사용자',
    profileImage: '/jjang.jpeg'
  };

  return (
    <div className="space-y-12">
      <UserProfile
        email={userData.email}
        nickname={userData.nickname}
        profileImage={userData.profileImage}
      />
      <MypageTap />
    </div>
  );
}
