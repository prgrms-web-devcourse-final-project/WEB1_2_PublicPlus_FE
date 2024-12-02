export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[768px] items-center justify-center">
      <main className="container flex-grow px-4">{children}</main>
    </div>
  );
}
