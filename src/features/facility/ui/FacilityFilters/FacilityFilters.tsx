import { Filter } from 'lucide-react';
import { Button } from '@/shared/ui/components/button/Button';
import { SearchBar } from '@/shared/ui/components/search/SearchBar';
import { useFilterStore } from '../../filter/model/store';
import { AreaFilter } from '../../filter/ui/AreaFilter';
import { CategoryFilter } from '../../filter/ui/CategoryFilter';
import { PriceFilter } from '../../filter/ui/PriceFilter';

export const FacilityFilters = ({
  showSearchBar = true
}: {
  showSearchBar?: boolean;
}) => {
  const { filters, setFilters, isFilterMenuOpen, toggleFilterMenu } =
    useFilterStore();

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, facilityName: value });
  };

  const handleSortChange = (type: 'likes' | 'views') => {
    const getNextOrder = (currentOrder: number = 0): number => {
      return (currentOrder + 1) % 3; // 0 -> 1 -> 2 -> 0
    };

    if (type === 'likes') {
      setFilters({
        ...filters,
        likeOrder: getNextOrder(filters.likeOrder),
        viewsOrder: 0
      });
    } else {
      setFilters({
        ...filters,
        viewsOrder: getNextOrder(filters.viewsOrder),
        likeOrder: 0
      });
    }
    toggleFilterMenu(null);
  };

  const getSortIcon = (order: number = 0) => {
    switch (order) {
      case 1:
        return '↓'; // 내림차순
      case 2:
        return '↑'; // 오름차순
      default:
        return '-'; // 정렬 없음
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          {/* 조회순 정렬 */}
          <Button
            variant="gray"
            onClick={() => handleSortChange('views')}
            className={`flex items-center gap-2 ${filters.viewsOrder === 1 ? 'bg-blue-100' : ''}`}>
            조회순 {getSortIcon(filters.viewsOrder)}
          </Button>

          {/* 좋아요순 정렬 */}
          <Button
            variant="gray"
            onClick={() => handleSortChange('likes')}
            className={`flex items-center gap-2 ${filters.likeOrder === 1 ? 'bg-blue-100' : ''}`}>
            좋아요순 {getSortIcon(filters.likeOrder)}
          </Button>

          {/* 필터 버튼들 - 변경 없음 */}
          <Button
            variant="gray"
            onClick={() => toggleFilterMenu('category')}
            className={`flex items-center gap-2 ${isFilterMenuOpen === 'category' ? 'bg-blue-100' : ''}`}>
            <Filter className="h-6 w-6" />
            종목
          </Button>
          <Button
            variant="gray"
            onClick={() => toggleFilterMenu('area')}
            className={`flex items-center gap-2 ${isFilterMenuOpen === 'area' ? 'bg-blue-100' : ''}`}>
            <Filter className="h-6 w-6" />
            지역
          </Button>
          <Button
            variant="gray"
            onClick={() => toggleFilterMenu('price')}
            className={`flex items-center gap-2 ${isFilterMenuOpen === 'price' ? 'bg-blue-100' : ''}`}>
            <Filter className="h-6 w-6" />
            요금
          </Button>
        </div>
      </div>

      {/* 나머지 코드는 동일 */}
      {showSearchBar && (
        <div className="relative flex-1">
          <SearchBar
            placeholder="시설 검색"
            value={filters.facilityName || ''}
            onChange={handleSearchChange}
          />
        </div>
      )}

      {isFilterMenuOpen === 'category' && <CategoryFilter />}
      {isFilterMenuOpen === 'area' && <AreaFilter />}
      {isFilterMenuOpen === 'price' && <PriceFilter />}
    </div>
  );
};
