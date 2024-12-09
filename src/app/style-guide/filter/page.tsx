'use client';
import { FilterKeyword } from '@/shared/ui/components/filter/FilterKeyword';
import { useState, useEffect } from 'react';

interface ListItem {
  id: string;
  title: string;
  type: 'all' | 'recent' | 'popular' | 'trending';
}

export default function FilterKeywordPage() {
  // 초기 아이템 목록
  const initialItems: ListItem[] = [
    { id: '1', title: '아이템 1', type: 'recent' },
    { id: '2', title: '아이템 2', type: 'popular' },
    { id: '3', title: '아이템 3', type: 'trending' },
    { id: '4', title: '아이템 4', type: 'all' }
  ];

  // 필터 상태
  const [filters, setFilters] = useState([
    { id: 'all', label: '전체', active: true },
    { id: 'recent', label: '최근', active: false },
    { id: 'popular', label: '인기', active: false },
    { id: 'trending', label: '트렌딩', active: false }
  ]);

  // 아이템 상태 초기화
  const [items, setItems] = useState<ListItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ListItem[]>([]);

  // 초기 아이템 설정
  useEffect(() => {
    setItems(initialItems);
    setFilteredItems(initialItems);
  }, []);

  // 필터 토글 핸들러
  const handleFilterToggle = (filterId: string) => {
    // 필터 상태 업데이트
    const updatedFilters = filters.map(filter => ({
      ...filter,
      active: filter.id === filterId
    }));
    setFilters(updatedFilters);

    // 아이템 필터링
    const selectedFilter = updatedFilters.find(f => f.active)?.id;
    const newFilteredItems =
      selectedFilter === 'all'
        ? items
        : items.filter(item => item.type === selectedFilter);

    setFilteredItems(newFilteredItems);
  };

  return (
    <div>
      <FilterKeyword
        filters={filters}
        onToggle={handleFilterToggle}
      />
      <div>
        {filteredItems.map(item => (
          <div key={item.id}>
            {item.title} - {item.type}
          </div>
        ))}
      </div>
    </div>
  );
}
