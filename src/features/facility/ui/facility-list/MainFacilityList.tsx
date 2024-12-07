'use client';

import { FacilityList } from '@/features/facility/ui/facility-list/FacilityList';

export const MainFacilityList = () => {
  return (
    <FacilityList
      maxItems={4}
      showPagination={false}
    />
  );
};
