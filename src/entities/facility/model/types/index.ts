import { Review, ExternalReview } from '@/entities/review/model/types/types';

// 기본 시설 정보 인터페이스
export interface Facility {
  facilityId: string;
  facilityName: string;
  facilityCategory: string;
  area: string;
  priceType: boolean;
  facilityImage: string;
  reservationURL: string;
  reservationStartDate: string;
  reservationEndDate: string;
}

// 시설 상세 정보 인터페이스
export interface FacilityDetail extends Facility {
  location: {
    latitude: number;
    longitude: number;
  };
  facilityNumber: string;
  facilityLocation: string;
  facilityDescription: string;
  serviceStartDate: string;
  serviceEndDate: string;
  reviews?: Review[];
  externalReviews?: ExternalReview[];
}

export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
