import { FacilityFilterDTO } from '@/types/facility/request';
import { api } from './axios';

export const facilityApi = {
  getFacilities: async (page: number, filters?: FacilityFilterDTO) => {
    const params = new URLSearchParams({ page: String(page), size: '5' });

    if (!filters || !Object.values(filters).some(value => value !== null)) {
      return api.get(`/facilities?${params}`);
    }

    return api.post(`/facilities?${params}`, filters);
  }
};
