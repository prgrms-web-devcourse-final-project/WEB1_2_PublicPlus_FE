import { create } from 'zustand';
import type { CategoryGroupCode } from '@/entities/map/model/types';

interface MapState {
  showMarkers: boolean;
  showInfoWindows: boolean;
  showCircle: boolean;
  selectedCategories: CategoryGroupCode[];
  showControls: boolean;
  mapLevel: number;
  searchRadius: number;
  setShowMarkers: (show: boolean) => void;
  setShowInfoWindows: (show: boolean) => void;
  setShowCircle: (show: boolean) => void;
  toggleControls: () => void;
  toggleCategory: (category: CategoryGroupCode) => void;
  setMapLevel: (level: number) => void;
  setSearchRadius: (radius: number) => void;
  resetState: () => void;
}

const INITIAL_STATE = {
  showMarkers: true,
  showInfoWindows: true,
  showCircle: true,
  selectedCategories: [], // 카테고리 필터 비활성화
  showControls: false,
  mapLevel: 4,
  searchRadius: 500
};

export const useMapStore = create<MapState>(set => ({
  ...INITIAL_STATE,

  setShowMarkers: show => set({ showMarkers: show }),
  setShowInfoWindows: show => set({ showInfoWindows: show }),
  setShowCircle: show => set({ showCircle: show }),
  toggleControls: () => set(state => ({ showControls: !state.showControls })),
  toggleCategory: category =>
    set(state => {
      const isSelected = state.selectedCategories.includes(category);
      const selectedCategories = isSelected
        ? state.selectedCategories.filter(c => c !== category)
        : [...state.selectedCategories, category];
      return { selectedCategories };
    }),
  setMapLevel: level => set({ mapLevel: level }),
  setSearchRadius: radius => set({ searchRadius: radius }),
  resetState: () => set(INITIAL_STATE)
}));
