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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FacilityDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { activeTab } = useFacilityStore();

  const {
    data: facility,
    isLoading,
    error
  } = useFacilityDetail(id, {
    enabled: Boolean(id),
    retry: false,
    onError: () => {
      toast.error('시설 정보를 불러오는데 실패했습니다.');
    }
  });

  if (!id) {
    return (
      <div className="p-4 text-center text-gray-500">잘못된 접근입니다.</div>
    );
  }

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <ErrorFallback message="시설 정보를 불러오는데 실패했습니다." />;
  }

  if (!facility) {
    return (
      <div className="p-4 text-center text-gray-500">시설 정보가 없습니다.</div>
    );
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
