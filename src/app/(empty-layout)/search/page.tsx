'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/common/SearchBar';
import { CustomHeader } from '@/components/common/Header/CustomHeader';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    // 검색 로직 구현
    setSearchQuery(searchQuery);
  };

  return (
    <div className="mx-auto">
      <CustomHeader />
      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="운동시설 또는 모임 이름을 입력하세요"
        />
      </div>

      {/* 검색 결과 컴포넌트 추가 예정 */}
    </div>
  );
}
