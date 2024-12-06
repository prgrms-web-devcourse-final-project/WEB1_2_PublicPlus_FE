import '@/styles/globals.css';
import { defaultMetadata } from '@/shared/config/metadata/default-metadata';
import { MSWComponent } from '@/components/MSWComponent';
import { Providers } from './providers';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Suspense } from 'react';
import Loading from '@/components/Suspense/Loading';

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
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <MSWComponent>
              <Providers>{children}</Providers>
            </MSWComponent>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
