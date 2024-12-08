'use client';

import { useFilterStore } from '@/features/facility/filter/model/store';
import { FacilityFilters } from '@/features/facility/ui/FacilityFilters/FacilityFilters';
import { FacilityList } from '@/features/facility/ui/FacilityList/FacilityList';
import { Button } from '@/shared/ui/components/Button/Button';
import { X } from 'lucide-react';

export default function FacilityPage() {
  const { filters, clearFilter } = useFilterStore();

  const getPriceTypeText = (value: boolean | undefined) => {
    if (value === true) return '무료';
    if (value === false) return '유료';
    return '';
  };

  const activeFilters = [
    { key: 'area', value: filters?.area },
    { key: 'facilityCategory', value: filters?.facilityCategory },
    { key: 'priceType', value: getPriceTypeText(filters?.priceType) }
  ].filter(filter => filter.value);

  const handleClearFilter = (key: string) => {
    clearFilter(key);
  };

  return (
    <div className="space-y-6">
      <FacilityFilters />

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(filter => (
            <Button
              key={filter.key}
              variant="badge"
              className="flex items-center gap-2 px-3 py-1"
              onClick={() => handleClearFilter(filter.key)}>
              <span>{filter.value}</span>
              <X className="h-4 w-4" />
            </Button>
          ))}
        </div>
      )}

      <FacilityList />
    </div>
  );
}
