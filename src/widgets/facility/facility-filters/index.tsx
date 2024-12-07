import { Filter } from 'lucide-react';
import { CategoryFilter } from '@/features/facility/filter/ui/category-filter';
import { AreaFilter } from '@/features/facility/filter/ui/area-filter';
import { PriceFilter } from '@/features/facility/filter/ui/price-filter';
import { Button } from '@/components/common/Button/Button';
import { useFilterStore } from '@/features/facility/filter/model/store';
import { SearchBar } from '@/components/common/SearchBar';

export const FacilityFilters = () => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, facilityName: value });
  };

  const handleSortChange = (type: 'likes' | 'views', order: number) => {
    if (type === 'likes') {
      setFilters({ ...filters, likeOrder: order, viewsOrder: undefined });
    } else {
      setFilters({ ...filters, viewsOrder: order, likeOrder: undefined });
    }
    toggleFilterMenu(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {/* 정렬 버튼들 */}
        <div className="flex gap-2">
          {/* 조회순 정렬 */}
          <Button
            variant="gray"
            onClick={() =>
              handleSortChange('views', filters.viewsOrder === 1 ? 2 : 1)
            }
            className={`flex gap-2 ${filters.viewsOrder === 1 ? 'bg-blue-100' : ''}`}>
            조회순 {filters.viewsOrder === 1 ? '↓' : '↑'}
          </Button>

          {/* 좋아요순 정렬 */}
          <Button
            variant="gray"
            onClick={() =>
              handleSortChange('likes', filters.likeOrder === 1 ? 2 : 1)
            }
            className={`flex gap-2 ${filters.likeOrder === 1 ? 'bg-blue-100' : ''}`}>
            좋아요순 {filters.likeOrder === 1 ? '↓' : '↑'}
          </Button>

          {/* 필터 버튼들 */}
          <Button
            variant="gray"
            onClick={() => toggleFilterMenu('category')}
            className={`flex gap-2 ${isFilterMenuOpen === 'category' ? 'bg-blue-100' : ''}`}>
            <Filter className="h-6 w-6" />
            종목
          </Button>
          <Button
            variant="gray"
            onClick={() => toggleFilterMenu('area')}
            className={`flex gap-2 ${isFilterMenuOpen === 'area' ? 'bg-blue-100' : ''}`}>
            <Filter className="h-6 w-6" />
            지역
          </Button>
          <Button
            variant="gray"
            onClick={() => toggleFilterMenu('price')}
            className={`flex gap-2 ${isFilterMenuOpen === 'price' ? 'bg-blue-100' : ''}`}>
            <Filter className="h-6 w-6" />
            요금
          </Button>
        </div>
      </div>

      {/* 시설 검색 입력 필드 */}
      <div className="relative flex-1">
        <SearchBar
          placeholder="시설 검색"
          value={filters.facilityName || ''}
          onChange={handleSearchChange}
        />
      </div>

      {isFilterMenuOpen === 'category' && <CategoryFilter />}
      {isFilterMenuOpen === 'area' && <AreaFilter />}
      {isFilterMenuOpen === 'price' && <PriceFilter />}
    </div>
  );
};
