import { useQuery } from '@tanstack/react-query';
import { facilityService } from '@/entities/facility/api/facilityService';

export const useFacilityDetail = (id: string) => {
  return useQuery({
    queryKey: ['facility', id],
    queryFn: () => facilityService.getFacilityDetail(id),
    enabled: !!id
  });
};
