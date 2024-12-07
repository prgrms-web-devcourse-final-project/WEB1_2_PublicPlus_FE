import { AREAS } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/components/common/Button/Button';

export const AreaFilter = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handleAreaChange = (area: string | undefined) => {
    setFilters({ ...filters, area });
    toggleFilterMenu(null);
  };

  if (isFilterMenuOpen !== 'area') return null;

  return (
    <div className="fixed bottom-[60px] left-0 right-0 z-[1000] m-auto rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">지역/구 선택</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={filters.area === undefined ? 'primary' : 'gray'}
            onClick={() => handleAreaChange(undefined)}>
            전체
          </Button>
          {AREAS.map(area => (
            <Button
              key={area.value}
              variant={filters.area === area.value ? 'primary' : 'gray'}
              onClick={() => handleAreaChange(area.value)}>
              {area.value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
