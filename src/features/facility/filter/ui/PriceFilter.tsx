import { PRICE_TYPES } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/shared/ui/components/Button/Button';

export const PriceFilter = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handlePriceChange = (price: boolean | undefined) => {
    setFilters({ ...filters, priceType: price });
    toggleFilterMenu(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleFilterMenu(null);
    }
  };

  if (isFilterMenuOpen !== 'price') return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="fixed bottom-[60px] left-0 right-0 z-[1000] m-auto w-full max-w-screen-lg rounded-t-2xl bg-white p-4 shadow-lg transition-transform md:bottom-auto md:left-auto md:right-0 md:top-16 md:w-[320px] md:rounded-lg">
        <h3 className="text-lg font-semibold mb-2">이용 요금</h3>
        <div className="flex gap-2 max-h-[300px] overflow-y-auto flex-wrap">
          <Button
            variant={filters.priceType === undefined ? 'primary' : 'gray'}
            onClick={() => handlePriceChange(undefined)}
            className="min-h-[36px] max-h-[36px] w-full">
            전체
          </Button>
          {PRICE_TYPES.map(price => (
            <Button
              key={price.value}
              variant={
                filters.priceType === Boolean(price.value) ? 'primary' : 'gray'
              }
              onClick={() => handlePriceChange(Boolean(price.value))}              
              className="min-h-[36px] max-h-[36px] w-full">
              {price.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
