import { Header } from '@/components/common/Header';
import { Navigation } from '@/components/common/Navigation/Navigation';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Navigation activeTab={'search'} />
    </>
  );
}
