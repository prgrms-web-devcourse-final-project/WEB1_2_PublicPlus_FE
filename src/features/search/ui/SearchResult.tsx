'use client';

import {
  FacilityCard,
  FacilityCardProps
} from '@/components/common/Cards/FacilityCard';
import {
  MeetingCard,
  MeetingCardProps
} from '@/components/common/Cards/MeetingCard';
import { useState, useEffect } from 'react';

// 통합 검색 결과 타입
type SearchResultItem = FacilityCardProps | MeetingCardProps;

interface SearchResultProps {
  searchQuery?: string;
}

export default function SearchResult({ searchQuery = '' }: SearchResultProps) {
  const [results, setResults] = useState<SearchResultItem[]>([]);

  const performSearch = async (query: string) => {
    // 시설 목업 데이터
    const mockFacilityResults: FacilityCardProps[] = [
      {
        id: '1',
        title: '헬스장 A',
        image: '/jjang.jpeg',
        price: '50,000원',
        tags: ['헬스', '피트니스', '운동'],
        reservationType: '온라인 직접 예약',
        domain: 'facility'
      },
      {
        id: '2',
        title: '크로스핏 B',
        image: '/jjang.jpeg',
        price: '70,000원',
        tags: ['크로스핏', '고강도', '그룹운동'],
        reservationType: '주민센터 문의',
        domain: 'facility'
      }
    ];

    // 모임 목업 데이터
    const mockMeetingResults: MeetingCardProps[] = [
      {
        id: '1',
        mbTitle: '주말 러닝 모임',
        mbDate: '2024-02-10',
        endDate: '2024-02-11',
        mbTime: '오전 10시',
        mbLocation: '한강공원',
        maxParticipants: 10,
        currentMembers: 5,
        image: '/jjang.jpeg',
        tags: ['러닝', '운동', '주말'],
        domain: 'meeting'
      },
      {
        id: '2',
        mbTitle: '크로스핏 초보자 모임',
        mbDate: '2024-02-15',
        mbTime: '저녁 7시',
        mbLocation: '강남 크로스핏 센터',
        maxParticipants: 8,
        currentMembers: 3,
        image: '/jjang.jpeg',
        tags: ['크로스핏', '초보자', '그룹운동'],
        domain: 'meeting'
      }
    ];

    // 통합 검색
    const filteredResults = [
      ...mockFacilityResults.filter(
        result =>
          result.title.includes(query) ||
          result.tags.some(tag => tag.includes(query))
      ),
      ...mockMeetingResults.filter(
        result =>
          result.mbTitle.includes(query) ||
          result.tags.some(tag => tag.includes(query))
      )
    ];

    setResults(filteredResults);
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
          {results.map(result =>
            result.domain === 'facility' ? (
              <FacilityCard
                key={result.id}
                {...(result as FacilityCardProps)}
              />
            ) : (
              <MeetingCard
                key={result.id}
                {...(result as MeetingCardProps)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
