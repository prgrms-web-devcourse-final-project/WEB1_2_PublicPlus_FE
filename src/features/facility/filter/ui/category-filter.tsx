import { Swiper, SwiperSlide } from 'swiper/react';
import { FACILITY_CATEGORIES } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/components/common/Button/Button';
import 'swiper/css';

export const CategoryFilter = () => {
  const { filters, setFilters } = useFilterStore();

  const handleCategoryChange = (category: string | undefined) => {
    setFilters({ ...filters, facilityCategory: category });
  };

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView="auto"
      className="category-swiper">
      <SwiperSlide>
        <Button
          variant={filters.facilityCategory === null ? 'primary' : 'gray'}
          onClick={() => handleCategoryChange(undefined)}>
          전체
        </Button>
      </SwiperSlide>
      {FACILITY_CATEGORIES.map(category => (
        <SwiperSlide key={category.value}>
          <Button
            variant={
              filters.facilityCategory === category.value ? 'primary' : 'gray'
            }
            onClick={() => handleCategoryChange(category.label)}>
            {category.label}
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
