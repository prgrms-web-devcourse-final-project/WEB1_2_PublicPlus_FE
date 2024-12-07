'use client';
import { TabType } from '@/widgets/Navigation';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/widgets/Navigation/ui/Navigation';
import { Header } from '@/widgets/Header/ui/Header';

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
    <div className="relative mx-auto min-h-screen w-full">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container flex-grow px-4">{children}</main>
        <Navigation activeTab={getActiveTab()} />
      </div>
    </div>
  );
}
