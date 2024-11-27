import { HttpResponse, http } from 'msw';
import { facilities, facilitiesDetail } from '../data/facilityData';
import { FacilityFilterDTO, FacilityDetailsResponseDTO } from '@/api/generated';
import { createPaginatedResponse, getPageParams } from './pagination';

const filterFacilities = (
  facilities: FacilityDetailsResponseDTO[],
  filters: FacilityFilterDTO
) => {
  let result = [...facilities];

  const { facilityCategory, area, priceType } = filters;

  if (facilityCategory) {
    result = result.filter(
      facility => facility.facilityCategory === facilityCategory
    );
  }

  if (area) {
    result = result.filter(facility => facility.area === area);
  }

  if (priceType !== null) {
    const priceTypeBoolean = priceType === true ? true : false;
    result = result.filter(facility => facility.priceType === priceTypeBoolean);
  }

  return result;
};

export const facilityHandlers = [
  // 시설 목록 조회
  http.get('/api/facility-detail/list', ({ request }) => {
    const { page, size } = getPageParams(request.url);
    const startIndex = page * size;
    const endIndex = startIndex + size;

    const paginatedItems = facilities.slice(startIndex, endIndex);

    return HttpResponse.json(
      createPaginatedResponse({
        page,
        size,
        totalItems: facilities,
        items: paginatedItems
      })
    );
  }),

  // 시설 목록 조회 (필터링 포함)
  http.post<never, FacilityFilterDTO>(
    '/api/facility-detail/filter',
    async ({ request }) => {
      const { page, size } = getPageParams(request.url);
      const filterData = (await request.json()) as FacilityFilterDTO;

      const filteredFacilities = filterFacilities(facilities, filterData);
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedItems = filteredFacilities.slice(startIndex, endIndex);

      return HttpResponse.json(
        createPaginatedResponse({
          page,
          size,
          totalItems: filteredFacilities,
          items: paginatedItems
        })
      );
    }
  ),

  // 시설 상세 정보 조회
  http.get<{ facilityId: string }>(
    '/api/facility-detail/:facilityId',
    ({ params }) => {
      const facility = facilitiesDetail.find(
        facility => facility.facilityId === params.facilityId
      );

      if (!facility) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Facility not found'
        });
      }

      return HttpResponse.json(facility);
    }
  )
];
