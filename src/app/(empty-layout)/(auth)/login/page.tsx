import LoginContainer from '@/features/auth/ui/LoginContainer';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Link href={'/login'}>
        <Image
          width={90}
          height={50}
          src={'/icons/logo.png'}
          alt="공공플러스"
          className="mb-24"
        />
      </Link>

      <LoginContainer />
    </div>
  );
}
