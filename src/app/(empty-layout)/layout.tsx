export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <main className="container flex-col items-center justify-center justify-between">
        {children}
      </main>
    </div>
  );
}
