import { HttpResponse, http } from 'msw';
import { facilities, facilitiesDetail } from '../data/facilityData';
import {
  FacilityFilterDTO,
  FacilityParams
} from '@/entities/facility/model/types/request';
import { FacilityResponse } from '@/entities/facility/model/types/response';

export const facilityHandlers = [
  // 시설 목록 조회
  http.get('/api/facilities', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 5;

    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedFacilities = facilities.slice(startIndex, endIndex);

    const responseData: FacilityResponse = {
      content: paginatedFacilities,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        offset: startIndex,
        paged: true,
        unpaged: false
      },
      last: endIndex >= facilities.length,
      totalPages: Math.ceil(facilities.length / size),
      totalElements: facilities.length,
      first: page === 0,
      size: size,
      number: page,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      numberOfElements: paginatedFacilities.length,
      empty: paginatedFacilities.length === 0
    };

    return HttpResponse.json(responseData);
  }),

  // 시설 목록 조회 (필터링 포함)
  http.post<never, FacilityFilterDTO>(
    '/api/facilities',
    async ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 5;

      const filterData = await request.json();
      const { facilityCategory, area, priceType } = filterData;

      let filteredFacilities = [...facilities];

      if (facilityCategory) {
        filteredFacilities = filteredFacilities.filter(
          facility => facility.facilityCategory === facilityCategory
        );
      }

      if (area) {
        filteredFacilities = filteredFacilities.filter(
          facility => facility.area === area
        );
      }

      if (priceType !== null) {
        const priceTypeBoolean = priceType === 1;
        filteredFacilities = filteredFacilities.filter(
          facility => facility.priceType === priceTypeBoolean
        );
      }

      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedFacilities = filteredFacilities.slice(
        startIndex,
        endIndex
      );

      const responseData: FacilityResponse = {
        content: paginatedFacilities,
        pageable: {
          pageNumber: page,
          pageSize: size,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          },
          offset: startIndex,
          paged: true,
          unpaged: false
        },
        last: endIndex >= filteredFacilities.length,
        totalPages: Math.ceil(filteredFacilities.length / size),
        totalElements: filteredFacilities.length,
        first: page === 0,
        size: size,
        number: page,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        numberOfElements: paginatedFacilities.length,
        empty: paginatedFacilities.length === 0
      };

      return HttpResponse.json(responseData);
    }
  ),

  // 시설 상세 정보 조회
  http.get<FacilityParams, never>(
    '/api/facility-details/list/:facilityId',
    ({ params }) => {
      const { facilityId } = params;
      const facility = facilitiesDetail.find(
        facility => facility.facilityId === facilityId
      );

      if (facility) {
        return HttpResponse.json(facility);
      }

      return new HttpResponse(JSON.stringify({ error: 'Facility not found' }), {
        status: 404
      });
    }
  )
];
