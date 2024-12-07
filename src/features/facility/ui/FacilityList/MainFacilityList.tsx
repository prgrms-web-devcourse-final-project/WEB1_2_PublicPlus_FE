'use client';

import { FacilityList } from './FacilityList';

export const MainFacilityList = () => {
  return (
    <FacilityList
      maxItems={4}
      showPagination={false}
    />
  );
};
