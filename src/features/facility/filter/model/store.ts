import { FacilityFilterDTO } from '@/api/generated';
import { create } from 'zustand';

interface FilterStore {
  filters: FacilityFilterDTO;
  isFilterMenuOpen: 'area' | 'price' | null;
  setFilters: (filters: FacilityFilterDTO) => void;
  toggleFilterMenu: (menuType: 'area' | 'price' | null) => void;
}

export const useFilterStore = create<FilterStore>(set => ({
  filters: {
    facilityCategory: null,
    area: null,
    priceType: null
  },
  isFilterMenuOpen: null,
  setFilters: filters => set({ filters }),
  toggleFilterMenu: menuType => set({ isFilterMenuOpen: menuType })
}));
