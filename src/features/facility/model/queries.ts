import { useQuery } from '@tanstack/react-query';
import type { FacilityFilterDTO } from '@/api/generated';
import { facilityService } from '@/entities/facility/api/facilityService';

// 헬퍼 함수: 필터 유효성 검사
const hasValidFilters = (filters?: FacilityFilterDTO): boolean => {
  return filters ? Object.values(filters).some(value => value !== null) : false;
};

// Query Key 정의
export const QUERY_KEYS = {
  facility: {
    all: ['facility'] as const,
    detail: (id: string) => [...QUERY_KEYS.facility.all, id] as const,
    list: (page: number, size: number, filters?: FacilityFilterDTO) =>
      [...QUERY_KEYS.facility.all, 'list', page, size, filters] as const
  }
} as const;

// 시설 상세 정보 조회
export const useFacilityDetail = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.facility.detail(id),
    queryFn: () => facilityService.getFacilityDetail(id),
    enabled: !!id, // id가 있어야만 쿼리 실행
    retry: false // 필요 시 재시도 여부 설정
  });
};

// 시설 목록 조회
export const useFacilities = (
  page: number = 0,
  size: number = 5,
  filters?: FacilityFilterDTO
) => {
  const hasFilters = hasValidFilters(filters);

  return useQuery({
    queryKey: QUERY_KEYS.facility.list(page, size, filters),
    queryFn: () => {
      if (hasFilters) {
        return facilityService.getFacilitiesWithFilter(page, size, filters!);
      }
      return facilityService.getFacilities(page, size);
    },
    enabled: page >= 0 && size > 0 // 유효한 페이지와 크기일 경우만 활성화
  });
};
