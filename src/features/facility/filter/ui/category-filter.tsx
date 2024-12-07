import { FACILITY_CATEGORIES } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/components/common/Button/Button';

export const CategoryFilter = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handleCategoryChange = (category: string | undefined) => {
    setFilters({ ...filters, facilityCategory: category });
    toggleFilterMenu(null);
  };

  if (isFilterMenuOpen !== 'category') return null;

  return (
    <div className="fixed bottom-[60px] left-0 right-0 z-[1000] m-auto rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">지역/구 선택</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={
              filters.facilityCategory === undefined ? 'primary' : 'gray'
            }
            onClick={() => handleCategoryChange(undefined)}>
            전체
          </Button>
          {FACILITY_CATEGORIES.map(category => (
            <Button
              key={category.value}
              variant={
                filters.facilityCategory === category.label ? 'primary' : 'gray'
              }
              onClick={() => handleCategoryChange(category.label)}>
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
