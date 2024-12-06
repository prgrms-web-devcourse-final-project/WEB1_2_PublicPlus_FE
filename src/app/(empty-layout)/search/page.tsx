'use client';

import { useState } from 'react';
import { CustomHeader } from '@/components/common/Header/CustomHeader';
import { SearchBar } from '@/components/common/SearchBar';
import SearchResult from '@/features/search/ui/SearchResult';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('검색어:', searchQuery);
    }
  };

  return (
    <div className="mx-auto">
      <CustomHeader />
      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="운동시설 또는 모임 이름을 입력하세요"
        />
      </div>
      <SearchResult searchQuery={searchQuery} />
    </div>
  );
}
