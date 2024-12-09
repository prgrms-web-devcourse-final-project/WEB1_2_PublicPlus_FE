'use client';

import { useParams } from 'next/navigation';
import { useFacilityStore } from '@/features/facility/model/store';
import {
  FacilityHeader,
  FacilityTabs,
  FacilityInfo,
  FacilityReviews,
  CreateMeetingButton
} from '@/features/facility';
import { useFacilityDetail } from '@/features/facility/model/queries';
import { FullScreenLoading } from '@/shared/ui/components/Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorFallback from '@/shared/ui/components/ErrorBoundary/ErrorFallback';
import { useAuthStore } from '@/entities/User';

export default function FacilityDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { activeTab } = useFacilityStore();
  const { tokens } = useAuthStore();
  const isToken = tokens?.access_token ?? '';

  const {
    data: facility,
    isLoading,
    error
  } = useFacilityDetail(id, isToken, {
    enabled: Boolean(id),
    retry: false,
    onError: () => {
      toast.error('시설 정보를 불러오는데 실패했습니다.');
    }
  });

  console.log('시설 정보 조회: ', facility);

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

      <CreateMeetingButton />
    </div>
  );
}
