import { api } from '@/shared/api/client';
import {
  FacilityDetailsResponseDTO,
  FacilityFilterDTO,
  PageFacilityResponseDTO
} from '@/api/generated';

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
  ): Promise<PageFacilityResponseDTO> => {
    const { data } = await api.facility.getAllFacilities({
      params: { page, size }
    });
    return data;
  },

  // 필터를 적용한 시설 목록 조회
  getFacilitiesWithFilter: async (
    page: number = 0,
    size: number = 5,
    filter: FacilityFilterDTO
  ): Promise<PageFacilityResponseDTO> => {
    const { data } = await api.facility.facilityFilter(filter, {
      params: { page, size }
    });
    return data;
  }
};
