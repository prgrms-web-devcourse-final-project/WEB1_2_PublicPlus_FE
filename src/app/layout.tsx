import '@/styles/globals.css';
import { defaultMetadata } from '@/metadata/default-metadata';

export const metadata = defaultMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
