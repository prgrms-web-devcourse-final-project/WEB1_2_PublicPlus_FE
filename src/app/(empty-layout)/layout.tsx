import Link from 'next/link';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Link href="/">🏠 HOME</Link>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
