import FacilityDetailClient from '@/components/FacilityDetailClient';
import { generateMetadata } from '@/metadata/generate-metadata';

export const metadata = generateMetadata({
  title: '시설 상세 정보',
  description: '공공 체육 시설 상세 정보를 확인하실 수 있습니다.'
});

export default function FacilityPage() {
  return (
    <div className="container mx-auto px-4">
      <FacilityDetailClient />
    </div>
  );
}
