import { Filter } from 'lucide-react';
import { CategoryFilter } from '@/features/facility/filter/ui/category-filter';
import { AreaFilter } from '@/features/facility/filter/ui/area-filter';
import { PriceFilter } from '@/features/facility/filter/ui/price-filter';
import { Button } from '@/components/common/Button/Button';
import { useFilterStore } from '@/features/facility/filter/model/store';
export const FacilityFilters = () => {
  const { toggleFilterMenu, setSort } = useFilterStore();

  const handleSortChange = (value: string) => {
    if (value === 'latest' || value === 'likes') {
      setSort(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="gray"
          onClick={() => handleSortChange('latest')}
          className="flex gap-2">
          최신순
        </Button>
        <Button
          variant="gray"
          onClick={() => handleSortChange('likes')}
          className="flex gap-2">
          좋아요순
        </Button>
        <Button
          variant="gray"
          onClick={() => toggleFilterMenu('category')}
          className="flex gap-2">
          <Filter className="h-6 w-6" />
          종목
        </Button>
        <Button
          variant="gray"
          onClick={() => toggleFilterMenu('area')}
          className="flex gap-2">
          <Filter className="h-6 w-6" />
          지역
        </Button>
        <Button
          variant="gray"
          onClick={() => toggleFilterMenu('price')}
          className="flex gap-2">
          <Filter className="h-6 w-6" />
          요금
        </Button>
      </div>

      <CategoryFilter />
      <AreaFilter />
      <PriceFilter />
    </div>
  );
};
