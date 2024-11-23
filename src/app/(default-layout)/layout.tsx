import { BottomNav } from '@/components/common/BottomNav';
import { Header } from '@/components/common/Header';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <BottomNav activeTab={'search'} />
    </>
  );
}
