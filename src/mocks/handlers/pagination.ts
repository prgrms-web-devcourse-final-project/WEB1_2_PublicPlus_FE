import { PageFacilityDetailsResponseDTO } from '@/shared/api/generated';

interface PaginationParams {
  page: number;
  size: number;
  totalItems: unknown[];
  items: unknown[];
}

export const createPaginatedResponse = ({
  page,
  size,
  totalItems,
  items
}: PaginationParams): PageFacilityDetailsResponseDTO => ({
  content: items,
  pageable: {
    pageNumber: page,
    pageSize: size,
    sort: { empty: true, sorted: false, unsorted: true },
    offset: page * size,
    paged: true,
    unpaged: false
  },
  last: (page + 1) * size >= totalItems.length,
  totalPages: Math.ceil(totalItems.length / size),
  totalElements: totalItems.length,
  first: page === 0,
  size,
  number: page,
  sort: { empty: true, sorted: false, unsorted: true },
  numberOfElements: items.length,
  empty: items.length === 0
});

export const getPageParams = (url: string) => {
  const urlObj = new URL(url);
  return {
    page: Number(urlObj.searchParams.get('page')) || 0,
    size: Number(urlObj.searchParams.get('size')) || 5
  };
};
