'use client';

import { FacilityList } from '@/widgets/facility/facility-list';
import { FacilityFilters } from '@/widgets/facility/facility-filters';

export default function FacilityPage() {
  return (
    <div className="space-y-6">
      <FacilityFilters />
      <FacilityList />
    </div>
  );
}
