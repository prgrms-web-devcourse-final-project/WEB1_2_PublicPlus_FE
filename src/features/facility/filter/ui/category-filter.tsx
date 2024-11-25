import { Swiper, SwiperSlide } from 'swiper/react';
import { FACILITY_CATEGORIES } from '@/shared/config/constants';
import { useFilterStore } from '../model/store';
import { Button } from '@/components/common/Button/Button';
import 'swiper/css';

export const CategoryFilter = () => {
  const { filters, setFilters } = useFilterStore();

  const handleCategoryChange = (category: string | null) => {
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
          onclickHandler={() => handleCategoryChange(null)}>
          전체
        </Button>
      </SwiperSlide>
      {FACILITY_CATEGORIES.map(category => (
        <SwiperSlide key={category.value}>
          <Button
            variant={
              filters.facilityCategory === category.value ? 'primary' : 'gray'
            }
            onclickHandler={() => handleCategoryChange(category.value)}>
            {category.label}
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
