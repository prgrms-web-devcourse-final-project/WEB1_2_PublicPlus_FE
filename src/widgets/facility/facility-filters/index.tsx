import { Filter } from 'lucide-react';
import { CategoryFilter } from '@/features/facility/filter/ui/category-filter';
import { AreaFilter } from '@/features/facility/filter/ui/area-filter';
import { PriceFilter } from '@/features/facility/filter/ui/price-filter';
import { Button } from '@/components/common/Button/Button';
import { useFilterStore } from '@/features/facility/filter/model/store';

export const FacilityFilters = () => {
  const toggleFilterMenu = useFilterStore(state => state.toggleFilterMenu);

  return (
    <div className="space-y-4">
      <CategoryFilter />

      <div className="flex gap-2">
        <Button
          variant="line"
          onclickHandler={() => toggleFilterMenu('area')}
          className="flex gap-2">
          <Filter className="h-6 w-6" />
          지역
        </Button>
        <Button
          variant="line"
          onclickHandler={() => toggleFilterMenu('price')}
          className="flex gap-2">
          <Filter className="h-6 w-6" />
          요금
        </Button>
      </div>

      <AreaFilter />
      <PriceFilter />
    </div>
  );
};
