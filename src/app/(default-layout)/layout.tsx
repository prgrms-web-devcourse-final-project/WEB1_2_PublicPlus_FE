import { BottomNav } from '@/components/common/BottomNav';
import { Header } from '@/components/common/Header';

export default function RootLayout({
  children,
  posterModal
}: Readonly<{
  children: React.ReactNode;
  posterModal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <BottomNav activeTab={'search'} />
      {posterModal}
    </>
  );
}
