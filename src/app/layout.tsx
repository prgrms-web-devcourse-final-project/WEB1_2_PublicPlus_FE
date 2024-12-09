import { Suspense } from 'react';
import { defaultMetadata } from '@/shared/config/metadata/default-metadata';
import { Providers } from './providers';
import localFont from 'next/font/local';
import ErrorBoundary from '@/shared/ui/components/ErrorBoundary/ErrorBoundary';
// import { MSWComponent } from '@/shared/lib/MSW/MSWComponent';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationHandler } from '@/features/notifications/hooks/NotificationHandler';
import { ToastContainer } from 'react-toastify';
import Loading from '@/shared/ui/components/suspense/Loading';

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap'
});

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
    <html
      lang="ko"
      className={`${pretendard.variable}`}>
      <body className="font-pretendard">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Providers>
              {children}
              <NotificationHandler />
              <ToastContainer />
            </Providers>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
