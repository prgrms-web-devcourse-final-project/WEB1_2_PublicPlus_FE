import { UserProfile } from '@/features/mypage/ui/UserProfile';
import { MypageTap } from '@/features/mypage/ui/MypageTap';
export default function ProfilePage() {
  const userData = {
    email: 'user@example.com',
    nickname: '사용자',
    profileImage: '/jjang.jpeg',
    description: '' // 빈 문자열이면 기본 텍스트 표시
  };

  return (
    <div className="space-y-4">
      <UserProfile
        email={userData.email}
        nickname={userData.nickname}
        profileImage={userData.profileImage}
      />
      <MypageTap />
    </div>
  );
}
