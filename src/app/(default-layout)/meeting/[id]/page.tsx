import { generateMetadata } from '@/shared/config/metadata/generate-metadata';
import MeetingDetail from '@/widgets/meeting/meeting-detail';

export const metadata = generateMetadata({
  title: '모임 상세 정보',
  description: '모임 상세 정보를 확인하실 수 있습니다.'
});

export default function MeetingPage() {
  return <MeetingDetail />;
}
