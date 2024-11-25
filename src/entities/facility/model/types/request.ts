// 필터 DTO 인터페이스
export interface FacilityFilterDTO {
  facilityCategory?: string | null;
  area?: string | null;
  priceType?: number | null;
}

// URL 파라미터 인터페이스
export interface FacilityParams {
  facilityId: string;
}
