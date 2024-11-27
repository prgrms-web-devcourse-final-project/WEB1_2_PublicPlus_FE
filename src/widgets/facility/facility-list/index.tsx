import { FacilityCard } from '@/components/common/Cards/FacilityCard';
import { useFilterStore } from '@/features/facility/filter/model/store';
import { Pagination } from '@/features/facility/pagination/ui/pagination';
import { FacilityDetailsResponseDTO } from '@/api/generated';
import { useState } from 'react';
import { useFacilities } from '@/features/facility/model/queries';

export const FacilityList = () => {
  const filters = useFilterStore(state => state.filters) || {};
  const [page, setPage] = useState(0);

  const { data, isLoading } = useFacilities(page, 5, filters);

  if (isLoading) return <p>시설 목록을 불러오는 중입니다...</p>;
  if (!data || !data.content?.length) return <p>검색 결과가 없습니다.</p>;

  return (
    <div className="space-y-4">
      {data.content.map((facility: FacilityDetailsResponseDTO) => (
        <FacilityCard
          {...facility}
          key={facility.facilityId || 'default-key'}
          domain="facility"
          id={facility.facilityId || ''}
          title={facility.facilityName || '시설 이름 없음'}
          price={facility.priceType ? '무료' : '유료'}
          tags={['깨끗함', '와이파이 제공', '주차장 무료']}
          reservationType={'국민체육센터'}
          image={facility.facilityImage || '/default-image.jpg'}
        />
      ))}
      <Pagination
        currentPage={page}
        totalPages={data.totalPages || 0}
        onPageChange={setPage}
      />
    </div>
  );
};
