'use client';
import { Header } from '@/components/common/Header';
import { TabType } from '@/components/common/Navigation';
import { Navigation } from '@/components/common/Navigation/Navigation';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname() || '/';

  // 타입을 명시적으로 지정
  const getActiveTab = (): TabType => {
    switch (true) {
      case pathname === '/':
        return 'home';
      case pathname.startsWith('/facility'):
        return 'facility';
      case pathname.startsWith('/chat'):
        return 'chat';
      case pathname.startsWith('/meeting'):
        return 'meeting';
      case pathname.startsWith('/profile'):
        return 'profile';
      default:
        return 'home';
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[768px]">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container flex-grow px-4">{children}</main>
        <Navigation activeTab={getActiveTab()} />
      </div>
    </div>
  );
}
