import { FacilityCard } from '@/components/common/Cards/FacilityCard';
import { useFilterStore } from '@/features/facility/filter/model/store';
import { Pagination } from '@/features/facility/pagination/ui/pagination';
import { facilityApi } from '@/shared/api/endpoints';
import { Facility } from '@/types/facility';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const FacilityList = () => {
  const filters = useFilterStore(state => state.filters);
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['facilities', page, filters],
    queryFn: () => facilityApi.getFacilities(page, filters)
  });

  if (isLoading) return <p>시설 목록을 불러오는 중입니다...</p>;
  if (!data?.data.content.length) return <p>검색 결과가 없습니다.</p>;

  return (
    <div className="space-y-4">
      {data.data.content.map((facility: Facility) => (
        <FacilityCard
          {...facility}
          key={facility.facilityId}
          domain={'facility'}
          id={facility.facilityId}
          title={facility.facilityName}
          price={facility.priceType ? '무료' : '유료'}
          tags={['깨끗함', '와이파이 제공', '주차장 무료']}
          reservationType={'국민체육센터'}
          image={facility.facilityImage}
        />
      ))}
      <Pagination
        currentPage={page}
        totalPages={data.data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
