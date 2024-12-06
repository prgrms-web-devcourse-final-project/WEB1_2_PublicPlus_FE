'use client';

import {
  FacilityCard,
  FacilityCardProps
} from '@/components/common/Cards/FacilityCard';
import { facilityService } from '@/entities/facility/api/facilityService';
import { useState, useEffect } from 'react';

interface SearchResultProps {
  searchQuery?: string;
}

export default function SearchResult({ searchQuery = '' }: SearchResultProps) {
  const [results, setResults] = useState<FacilityCardProps[]>([]);

  const performSearch = async (query: string) => {
    try {
      const { content: facilities } = await facilityService.getFacilities(
        0,
        100
      );

      const facilitiesList = facilities || [];
      const filteredResults = facilitiesList
        .filter(facility => facility.facilityName)
        .map(
          facility =>
            ({
              id: facility.facilityId || '',
              title: facility.facilityName || '제목 없음',
              image: facility.facilityImage || '',
              price: facility.priceType ? '유료' : '무료',
              tags: [
                facility.facilityCategory || '미분류',
                facility.area || '지역 미지정'
              ],
              reservationType: '온라인 직접 예약' as const,
              domain: 'facility'
            }) as FacilityCardProps
        )
        .filter(
          facility =>
            facility.title.includes(query) ||
            facility.tags.some(tag => tag.includes(query))
        );

      setResults(filteredResults);
    } catch (error) {
      console.error('검색 실패', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="search-results">
      {searchQuery && (
        <h2 className="my-8 text-m font-bold">
          "{searchQuery}" 검색 결과 ({results.length}개)
        </h2>
      )}

      {results.length === 0 ? (
        searchQuery ? (
          <div className="py-10 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : null
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {results.map(result => (
            <FacilityCard
              key={result.id}
              {...result}
            />
          ))}
        </div>
      )}
    </div>
  );
}
