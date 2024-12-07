'use client';
import { FacilityList } from '.';

export const MainFacilityList = () => {
  return (
    <FacilityList
      maxItems={4}
      showPagination={false}
    />
  );
};
