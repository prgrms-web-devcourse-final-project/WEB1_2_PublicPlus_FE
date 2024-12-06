'use client';

import { ChevronRight } from 'lucide-react';
import { FacilityList } from '.';
import Link from 'next/link';

export const MainFacilityList = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">공공 체육 시설</h2>
        <Link
          href="/facility"
          className="flex items-center text-blue-500">
          전체 보기
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <FacilityList
        maxItems={4}
        showPagination={false}
      />
    </div>
  );
};
