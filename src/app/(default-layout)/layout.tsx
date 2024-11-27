import { Header } from '@/components/common/Header';
import { Navigation } from '@/components/common/Navigation/Navigation';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[768px]">
      <div className="flex min-h-screen flex-col">
        <Header detailTitle="시설명" />
        <main className="container flex-grow px-4">{children}</main>
        <Navigation activeTab={'search'} />
      </div>
    </div>
  );
}
