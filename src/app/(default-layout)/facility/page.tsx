'use client';

import { Button } from '@/components/common/Button/Button';
import { FacilityCard } from '@/components/common/Cards/FacilityCard';
import { FacilityFilterDTO } from '@/types/facility/request';
import type { Facility } from '@/types/facility';
import { useCallback, useEffect, useState } from 'react';
import { FacilityResponse } from '@/types/facility/response';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useToast } from '@/components/common/Toast/Toast';
import { Filter } from 'lucide-react';

// 필터 옵션 상수
const FACILITY_CATEGORIES = [
  { value: 'FOOTBALL_FIELD', label: '축구장' },
  { value: 'FUTSAL_FIELD', label: '풋살장' },
  { value: 'BASEBALL_FIELD', label: '야구장' },
  { value: 'TENNIS_FIELD', label: '테니스장' },
  { value: 'BASKETBALL_FIELD', label: '농구장' },
  { value: 'VOLLEYBALL_FIELD', label: '배구장' },
  { value: 'TABLE_TENNIS_FIELD', label: '탁구장' },
  { value: 'BADMINTON_FIELD', label: '배드민턴장' },
  { value: 'FOOT_VOLLEYBALL_FIELD', label: '족구장' },
  { value: 'SWIMMING_POOL', label: '수영장' },
  { value: 'GYM', label: '체육관' },
  { value: 'MULTIPURPOSE_FIELD', label: '다목적경기장' }
];

const AREAS = [
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' }
];

const PRICE_TYPES = [
  { value: 1, label: '무료' },
  { value: 0, label: '유료' }
];

export default function Facility() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filters, setFilters] = useState<FacilityFilterDTO>({
    facilityCategory: null,
    area: null,
    priceType: null
  });
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    currentPage: 0,
    totalElements: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<
    'area' | 'price' | null
  >(null);
  const { showToast, ToastComponent } = useToast();

  // 필터 메뉴 토글 함수
  const toggleFilterMenu = (menuType: 'area' | 'price' | null) => {
    setIsFilterMenuOpen(menuType);
  };

  // 필터 업데이트 후 토스트 닫기
  const handleFilterUpdate = (
    key: keyof FacilityFilterDTO,
    value: string | number | null
  ) => {
    updateFilter(key, value);
    setIsFilterMenuOpen(null);
  };

  const fetchFacilities = useCallback(
    async (page: number = 0) => {
      try {
        setIsLoading(true);
        const hasActiveFilters = Object.values(filters).some(
          value => value !== null
        );
        console.log('Current filters:', filters);

        const queryParams = new URLSearchParams({
          page: page.toString(),
          size: '5'
        });

        let response;
        if (!hasActiveFilters) {
          response = await fetch(`/api/facilities?${queryParams}`);
        } else {
          response = await fetch(`/api/facilities?${queryParams}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              facilityCategory: filters.facilityCategory,
              area: filters.area,
              priceType: filters.priceType
            })
          });
        }

        if (!response.ok) {
          throw new Error('API 요청 실패');
        }

        const data: FacilityResponse = await response.json();
        setFacilities(data.content);
        setPageInfo({
          totalPages: data.totalPages,
          currentPage: data.number,
          totalElements: data.totalElements
        });
      } catch (error) {
        console.error('API 요청 오류:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (pageNumber: number) => {
      fetchFacilities(pageNumber);
    },
    [fetchFacilities]
  );

  useEffect(() => {
    fetchFacilities(0);
  }, [fetchFacilities]);

  const updateFilter = (
    key: keyof FacilityFilterDTO,
    value: string | number | null
  ) => {
    console.log('Updating filter:', key, value);
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: value
      };
      console.log('New filters state:', newFilters);
      return newFilters;
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* 시설 카테고리 슬라이더 */}
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          className="category-swiper">
          <SwiperSlide>
            <Button
              variant={filters.facilityCategory === null ? 'primary' : 'gray'}
              onclickHandler={() => updateFilter('facilityCategory', null)}>
              전체
            </Button>
          </SwiperSlide>
          {FACILITY_CATEGORIES.map(category => (
            <SwiperSlide key={category.value}>
              <Button
                variant={
                  filters.facilityCategory === category.value
                    ? 'primary'
                    : 'gray'
                }
                onclickHandler={() =>
                  updateFilter('facilityCategory', category.value)
                }>
                {category.label}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 필터 버튼들 */}
        <div className="flex gap-2">
          <Button
            variant="line"
            onclickHandler={() => toggleFilterMenu('area')}
            className="flex gap-2">
            <Filter className="h-6 w-6" />
            지역
          </Button>
          <Button
            variant="line"
            onclickHandler={() => toggleFilterMenu('price')}
            className="flex gap-2">
            <Filter className="h-6 w-6" />
            요금
          </Button>
        </div>
      </div>

      {/* 시설 목록 */}
      {isLoading ? (
        <p>시설 목록을 불러오는 중입니다...</p>
      ) : facilities.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {facilities.map(facility => (
            <FacilityCard
              key={facility.facilityId}
              domain={'facility'}
              id={facility.facilityId}
              title={facility.facilityName}
              price={facility.priceType ? '무료' : '유료'}
              tags={['깨끗함', '와이파이 제공', '주차장 무료']}
              reservationType={'국민체육센터'}
              image={facility.facilityImage}
            />
          ))}
        </div>
      )}

      {/* 페이지네이션 UI */}
      {!isLoading && facilities.length > 0 && (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="gray"
              onclickHandler={() => handlePageChange(pageInfo.currentPage - 1)}
              disabled={pageInfo.currentPage === 0}>
              이전
            </Button>
            {Array.from({ length: pageInfo.totalPages }, (_, i) => (
              <Button
                key={i}
                variant={i === pageInfo.currentPage ? 'primary' : 'gray'}
                onclickHandler={() => handlePageChange(i)}>
                {i + 1}
              </Button>
            ))}
            <Button
              variant="gray"
              onclickHandler={() => handlePageChange(pageInfo.currentPage + 1)}
              disabled={pageInfo.currentPage === pageInfo.totalPages - 1}>
              다음
            </Button>
          </div>
          <div className="text-center text-sm text-gray-600">
            총 {pageInfo.totalElements}개의 시설 | {pageInfo.currentPage + 1} /{' '}
            {pageInfo.totalPages} 페이지
          </div>
        </div>
      )}

      {/* 토스트 메뉴 */}
      {isFilterMenuOpen === 'area' && (
        <div className="fixed bottom-[60px] left-0 right-0 z-[1000] rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">지역 선택</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={filters.area === null ? 'primary' : 'gray'}
                onclickHandler={() => handleFilterUpdate('area', null)}>
                전체
              </Button>
              {AREAS.map(area => (
                <Button
                  key={area.value}
                  variant={filters.area === area.value ? 'primary' : 'gray'}
                  onclickHandler={() => handleFilterUpdate('area', area.value)}>
                  {area.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isFilterMenuOpen === 'price' && (
        <div className="fixed bottom-[60px] left-0 right-0 z-[1000] rounded-t-2xl bg-white p-4 shadow-lg transition-transform">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">이용 요금</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={filters.priceType === null ? 'primary' : 'gray'}
                onclickHandler={() => handleFilterUpdate('priceType', null)}>
                전체
              </Button>
              {PRICE_TYPES.map(price => (
                <Button
                  key={price.value}
                  variant={
                    filters.priceType === price.value ? 'primary' : 'gray'
                  }
                  onclickHandler={() =>
                    handleFilterUpdate('priceType', price.value)
                  }>
                  {price.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 토스트 컴포넌트 */}
      {ToastComponent}
    </div>
  );
}
