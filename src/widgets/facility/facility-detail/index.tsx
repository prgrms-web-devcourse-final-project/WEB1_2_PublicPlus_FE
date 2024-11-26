'use client';

import { useParams } from 'next/navigation';
import Loading from '@/components/Suspense/Loading';
import { useFacilityStore } from '@/features/facility/model/store';
import { useFacilityDetail } from '@/features/facility/model/queries';
import {
  FacilityHeader,
  FacilityTabs,
  FacilityInfo,
  FacilityReviews,
  FacilityRules,
  CreateMeetingButton
} from '@/features/facility';

export default function FacilityDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { activeTab } = useFacilityStore();

  const { data: facility, isLoading, error } = useFacilityDetail(id);

  if (!id) {
    return <div className="p-4 text-center">잘못된 접근입니다.</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error.message}</div>;
  }

  if (!facility) {
    return <div className="p-4 text-center">존재하지 않는 시설입니다.</div>;
  }

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
