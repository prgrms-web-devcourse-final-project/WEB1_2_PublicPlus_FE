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
      onClick={handleBackdropClick}
    >
      <div className="fixed bottom-[60px] left-0 right-0 z-[1000] m-auto w-full max-w-screen-lg rounded-t-2xl bg-white p-4 shadow-lg transition-transform md:bottom-auto md:left-auto md:right-0 md:top-16 md:w-[320px] md:rounded-lg">
        <h3 className="text-lg font-semibold mb-2">종목 선택</h3>
        <div className="flex gap-2 max-h-[300px] overflow-y-auto flex-wrap">
          <Button
            variant={
              filters.facilityCategory === undefined ? 'primary' : 'gray'
            }
            onClick={() => handleCategoryChange(undefined)}
            className="min-h-[36px] max-h-[36px] w-full">
            전체
          </Button>
          {FACILITY_CATEGORIES.map(category => (
            <Button
              key={category.value}
              variant={
                filters.facilityCategory === category.label ? 'primary' : 'gray'
              }
              onClick={() => handleCategoryChange(category.label)}
              className="min-h-[36px] max-h-[36px] w-full">
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
