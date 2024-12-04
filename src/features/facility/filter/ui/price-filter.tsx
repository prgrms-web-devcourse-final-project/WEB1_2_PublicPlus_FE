import { PRICE_TYPES } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/components/common/Button/Button';

export const PriceFilter = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handlePriceChange = (price: number | null) => {
    setFilters({ ...filters, priceType: price });
    toggleFilterMenu(null);
  };

  if (isFilterMenuOpen !== 'price') return null;

  return (
    <div className="fixed bottom-[60px] left-0 right-0 z-[1000] rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">이용 요금</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={filters.priceType === null ? 'primary' : 'gray'}
            onclick={() => handlePriceChange(null)}>
            전체
          </Button>
          {PRICE_TYPES.map(price => (
            <Button
              key={price.value}
              variant={filters.priceType === price.value ? 'primary' : 'gray'}
              onclick={() => handlePriceChange(price.value)}>
              {price.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
