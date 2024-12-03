import { UserProfile } from '@/features/mypage/ui/UserProfile';
import { MypageTap } from '@/features/mypage/ui/MypageTap';
export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <UserProfile />
      <MypageTap />
    </div>
  );
}
