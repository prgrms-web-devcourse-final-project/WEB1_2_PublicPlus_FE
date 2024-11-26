import { api } from '@/shared/api/axios';
import type { FacilityDetail } from '../model/types';

export const facilityService = {
  getFacilityDetail: async (id: string) => {
    const { data } = await api.get<FacilityDetail>(
      `/facility-details/list/${id}`
    );
    return data;
  }
};
