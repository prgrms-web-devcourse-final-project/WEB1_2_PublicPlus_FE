export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[768px]">
      <main className="container flex-grow px-4">{children}</main>
    </div>
  );
}
