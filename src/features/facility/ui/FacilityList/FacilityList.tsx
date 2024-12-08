import { useFilterStore } from '@/features/facility/filter/model/store';
import { FacilityDetailsResponseDTO } from '@/shared/api/generated';
import { useState } from 'react';
import { useFacilities } from '@/features/facility/model/queries';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FacilityCard } from '@/widgets/FacilityCard/ui/FacilityCard';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

export const FacilityList = ({
  maxItems,
  showPagination = true
}: {
  maxItems?: number;
  showPagination?: boolean;
}) => {
  const filters = useFilterStore(state => state.filters) || {};
  const [page, setPage] = useState(0);
  const size = maxItems ?? 5; // maxItems가 없으면 기본값 5

  const { data, isLoading, error } = useFacilities(page, size, filters, {
    onError: error => {
      toast.error(
        error instanceof Error
          ? error.message
          : '시설 정보를 불러오는 데 실패했습니다.'
      );
    }
  });

  if (isLoading) return <p>시설 목록을 불러오는 중입니다...</p>;
  if (error) return <p>시설 정보를 불러오는 데 실패했습니다.</p>;
  if (!data?.content?.length) return <p>검색 결과가 없습니다.</p>;

  console.log('시설 목록 데이터: ', data);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-4">
      {data.content.map((facility: FacilityDetailsResponseDTO) => (
        <FacilityCard
          domain="facility"
          key={facility.facilityId}
          facilityId={facility.facilityId}
          facilityName={facility.facilityName}
          priceType={facility.priceType}
          facilityCategory={facility.facilityCategory}
          reservationType={facility.reservationType}
          facilityImage={facility.facilityImage}
          reservationStartDate={formatDate(facility.reservationStartDate)}
          reservationEndDate={formatDate(facility.reservationEndDate)}
          likeCoount={facility.likes}
          viewCoount={facility.views}
        />
      ))}
      {showPagination && (
        <Pagination
          currentPage={page}
          totalPages={data.page?.totalPages ?? 0}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
