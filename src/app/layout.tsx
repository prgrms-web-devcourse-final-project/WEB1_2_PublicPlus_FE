import '@/styles/globals.css';
import { defaultMetadata } from '@/metadata/default-metadata';
import { MSWComponent } from '@/components/MSWComponent';

export const metadata = defaultMetadata;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fff'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
}
