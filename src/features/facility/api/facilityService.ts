import { api } from '@/shared/api/client';
import {
  FacilityDetailsResponseDTO,
  FacilityFilterDTO,
  PagedModel,
  Pageable
} from '@/shared/api/generated';

export const facilityService = {
  // 시설 상세 정보 조회
  getFacilityDetail: async (
    id: string
  ): Promise<FacilityDetailsResponseDTO> => {
    const { data } = await api.facility.readFacilityDetails(id);
    return data;
  },

  // 전체 시설 목록 조회
  getFacilities: async (
    page: number = 0,
    size: number = 5
  ): Promise<PagedModel> => {
    const pageable: Pageable = {
      page,
      size,
      sort: []
    };
    const { data } = await api.facility.getAllFacilityDetails(pageable);
    return data;
  },

  // 필터를 적용한 시설 목록 조회
  getFacilitiesWithFilter: async (
    page: number = 0,
    size: number = 5,
    filter: FacilityFilterDTO
  ): Promise<PagedModel> => {
    const pageable: Pageable = {
      page,
      size,
      sort: []
    };
    const { data } = await api.facility.facilityFilter(pageable, filter);
    return data;
  }
};
