import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

export const defaultMetadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name ?? '공공플러스 - 운동 메이트 매칭 서비스'
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    type: 'website',
    images: `${SITE_CONFIG.url}/og-image.jpg`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'ko_KR'
  },
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  themeColor: '#ffffff',
  category: 'sports'
};
