'use client';

import { useParams } from 'next/navigation';
import { useFacilityStore } from '@/features/facility/model/store';
import {
  FacilityHeader,
  FacilityTabs,
  FacilityInfo,
  FacilityReviews,
  FacilityRules,
  CreateMeetingButton
} from '@/features/facility';
import { useFacilityDetail } from '@/features/facility/model/queries';
import { FullScreenLoading } from '@/components/common/Loading';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';

export default function FacilityDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { activeTab } = useFacilityStore();

  const { data: facility, isLoading, error } = useFacilityDetail(id);

  if (!id) {
    return <div className="p-4 text-center">잘못된 접근입니다.</div>;
  }

  if (isLoading) return <FullScreenLoading />;

  if (error) {
    if (error instanceof Error) {
      // 404 에러인 경우
      if (error?.message?.includes('404')) {
        return <div className="p-4 text-center">존재하지 않는 시설입니다.</div>;
      }
      // 기타 에러
      return <ErrorFallback message={error.message} />;
    }
    return <ErrorFallback message="알 수 없는 에러가 발생했습니다." />;
  }

  if (!facility) return null;

  return (
    <div className="flex flex-col">
      <FacilityHeader facility={facility} />

      <FacilityTabs />

      {activeTab === 'info' && <FacilityInfo facility={facility} />}
      {activeTab === 'review' && <FacilityReviews facility={facility} />}
      {activeTab === 'rules' && <FacilityRules />}

      <CreateMeetingButton />
    </div>
  );
}
