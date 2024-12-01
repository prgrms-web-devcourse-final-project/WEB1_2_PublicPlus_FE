import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false
}: GenerateMetadataProps): Metadata {
  const metadata: Metadata = {
    title: title,
    description: description || SITE_CONFIG.description,
    openGraph: {
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      type: 'website',
      images: image
        ? `${SITE_CONFIG.url}${image}`
        : `${SITE_CONFIG.url}/og-image.jpg`,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: 'ko_KR'
    }
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false
    };
  }

  return metadata;
}
