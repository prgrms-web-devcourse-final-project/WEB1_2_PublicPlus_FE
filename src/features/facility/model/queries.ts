import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type {
  FacilityFilterDTO,
  FacilityDetailsResponseDTO,
  PageFacilityResponseDTO
} from '@/api/generated';
import { facilityService } from '@/entities/facility/api/facilityService';

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
export const useFacilityDetail = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      FacilityDetailsResponseDTO,
      Error,
      FacilityDetailsResponseDTO,
      ReturnType<typeof QUERY_KEYS.facility.detail>
    >,
    'queryKey' | 'queryFn'
  > & {
    onError?: (error: Error) => void;
  }
) => {
  return useQuery<
    FacilityDetailsResponseDTO,
    Error,
    FacilityDetailsResponseDTO,
    ReturnType<typeof QUERY_KEYS.facility.detail>
  >({
    queryKey: QUERY_KEYS.facility.detail(id),
    queryFn: () => facilityService.getFacilityDetail(id),
    ...options
  });
};

// 시설 목록 조회
export const useFacilities = (
  page: number = 0,
  size: number = 5,
  filters?: FacilityFilterDTO,
  options?: Omit<
    UseQueryOptions<
      PageFacilityResponseDTO,
      Error,
      PageFacilityResponseDTO,
      ReturnType<typeof QUERY_KEYS.facility.list>
    >,
    'queryKey' | 'queryFn'
  > & {
    onError?: (error: Error) => void;
  }
) => {
  return useQuery<
    PageFacilityResponseDTO,
    Error,
    PageFacilityResponseDTO,
    ReturnType<typeof QUERY_KEYS.facility.list>
  >({
    queryKey: QUERY_KEYS.facility.list(page, size, filters),
    queryFn: () =>
      filters
        ? facilityService.getFacilitiesWithFilter(page, size, filters)
        : facilityService.getFacilities(page, size),
    ...options
  });
};
