import MeetingDetail from '@/features/meeting/ui/meeting-detail/MeetingDetail';
import { generateMetadata } from '@/shared/config/metadata/generate-metadata';

export const metadata = generateMetadata({
  title: '모임 상세 정보',
  description: '모임 상세 정보를 확인하실 수 있습니다.'
});

export default function MeetingPage() {
  return <MeetingDetail />;
}
