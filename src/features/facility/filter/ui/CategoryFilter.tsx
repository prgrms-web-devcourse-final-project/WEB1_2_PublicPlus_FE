import { FACILITY_CATEGORIES } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/shared/ui/components/Button/Button';

export const CategoryFilter = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handleCategoryChange = (category: string | undefined) => {
    setFilters({ ...filters, facilityCategory: category });
    toggleFilterMenu(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleFilterMenu(null);
    }
  };

  if (isFilterMenuOpen !== 'category') return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50"
      onClick={handleBackdropClick}>
      <div className="max-w-screen-lg fixed bottom-0 left-0 right-0 z-[1000] m-auto w-full max-w-[600px] rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
        <h3 className="mb-2 text-lg font-semibold">종목 선택</h3>
        <div className="flex max-h-[300px] flex-wrap gap-2 overflow-y-auto">
          <Button
            variant={
              filters.facilityCategory === undefined ? 'primary' : 'gray'
            }
            onClick={() => handleCategoryChange(undefined)}
            className="max-h-[36px] min-h-[36px] w-full">
            전체
          </Button>
          {FACILITY_CATEGORIES.map(category => (
            <Button
              key={category.value}
              variant={
                filters.facilityCategory === category.label ? 'primary' : 'gray'
              }
              onClick={() => handleCategoryChange(category.label)}
              className="max-h-[36px] min-h-[36px] w-full">
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
