import FacilityDetail from '@/widgets/facility/facility-detail';
import { generateMetadata } from '@/metadata/generate-metadata';

export const metadata = generateMetadata({
  title: '시설 상세 정보',
  description: '공공 체육 시설 상세 정보를 확인하실 수 있습니다.'
});

export default function FacilityPage() {
  return <FacilityDetail />;
}
