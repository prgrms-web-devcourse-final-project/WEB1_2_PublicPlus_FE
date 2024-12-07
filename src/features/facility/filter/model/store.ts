import { FacilityFilterDTO } from '@/shared/api/generated';
import { create } from 'zustand';

interface FilterStore {
  filters: FacilityFilterDTO;
  sort: 'latest' | 'likes' | undefined;
  isFilterMenuOpen: 'category' | 'area' | 'price' | null;
  setFilters: (filters: FacilityFilterDTO) => void;
  setSort: (sort: 'latest' | 'likes' | undefined) => void;
  toggleFilterMenu: (menuType: 'category' | 'area' | 'price' | null) => void;
  clearFilter: (key: string) => void;
}

export const useFilterStore = create<FilterStore>(set => ({
  filters: {
    facilityCategory: undefined,
    area: undefined,
    priceType: undefined
  },
  sort: 'latest',
  isFilterMenuOpen: null,
  setFilters: filters => set({ filters }),
  setSort: sort => set({ sort }),
  toggleFilterMenu: menuType => set({ isFilterMenuOpen: menuType }),
  clearFilter: (key: string) =>
    set(state => ({
      filters: {
        ...state.filters,
        [key]: undefined
      }
    }))
}));
