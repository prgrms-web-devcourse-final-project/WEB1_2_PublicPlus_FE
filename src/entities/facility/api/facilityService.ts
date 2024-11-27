import { api } from '@/shared/api/client';
import type {
  FacilityDetailsResponseDTO,
  FacilityFilterDTO,
  PageFacilityResponseDTO
} from '@/api/generated';
import axios from 'axios';

export const facilityService = {
  // 시설 상세 정보 조회
  getFacilityDetail: async (
    id: string
  ): Promise<FacilityDetailsResponseDTO> => {
    try {
      const { data } = await api.facility.readFacilityDetails(id);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('해당 시설을 찾을 수 없습니다.');
        }
        throw new Error('시설 정보를 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },

  // 전체 시설 목록 조회
  getFacilities: async (
    page: number = 0,
    size: number = 5
  ): Promise<PageFacilityResponseDTO> => {
    try {
      const params = { page, size };
      const { data } = await api.facility.getAllFacilities({ params });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('시설 목록을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  },

  // 필터를 적용한 시설 목록 조회
  getFacilitiesWithFilter: async (
    page: number = 0,
    size: number = 5,
    filter: FacilityFilterDTO
  ): Promise<PageFacilityResponseDTO> => {
    try {
      const params = { page, size };
      const { data } = await api.facility.facilityFilter({
        ...filter,
        ...params
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('필터링된 시설 목록을 불러오는데 실패했습니다.');
      }
      throw error;
    }
  }
};
