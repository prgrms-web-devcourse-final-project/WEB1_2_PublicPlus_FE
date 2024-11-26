'use client';
import { Button } from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';

export default function SignupCompletePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mt-[24vh] flex flex-col items-center">
        <div className="mb-12 space-y-4 text-center text-gray-600">
          <p>회원가입이 완료되었습니다.</p>
          <p>로그인 후 서비스를 이용해주세요.</p>
        </div>
        <Button
          onclickHandler={handleLogin}
          size="md"
          fullWidth>
          로그인하기
        </Button>
      </div>
    </div>
  );
}
