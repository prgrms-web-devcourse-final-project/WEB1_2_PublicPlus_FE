'use client';

import { ChevronRight } from 'lucide-react';
import { FacilityFilters } from '../FacilityFilters/FacilityFilters';
import { MainFacilityList } from '../FacilityList/MainFacilityList';

export const FacilitySection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">공공 체육 시설</h2>
        <button className="flex items-center text-blue-500">
          전체 보기
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-6">
        <FacilityFilters showSearchBar={false} />
        <MainFacilityList />
      </div>
    </div>
  );
};
