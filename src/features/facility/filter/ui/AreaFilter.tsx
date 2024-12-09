import { AREAS } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/shared/ui/components/button/Button';

export const AreaFilter = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handleAreaChange = (area: string | undefined) => {
    setFilters({ ...filters, area });
    toggleFilterMenu(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleFilterMenu(null);
    }
  };

  if (isFilterMenuOpen !== 'area') return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50"
      onClick={handleBackdropClick}>
      <div className="max-w-screen-lg fixed bottom-0 left-0 right-0 z-[1000] m-auto w-full max-w-[600px] rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
        <h3 className="mb-2 text-lg font-semibold">지역/구 선택</h3>
        <div className="flex max-h-[300px] flex-wrap gap-2 overflow-y-auto">
          <Button
            variant={filters.area === undefined ? 'primary' : 'gray'}
            onClick={() => handleAreaChange(undefined)}
            className="max-h-[36px] min-h-[36px] w-full">
            전체
          </Button>
          {AREAS.map(area => (
            <Button
              key={area.value}
              variant={filters.area === area.value ? 'primary' : 'gray'}
              onClick={() => handleAreaChange(area.value)}
              className="max-h-[36px] min-h-[36px] w-full">
              {area.value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
