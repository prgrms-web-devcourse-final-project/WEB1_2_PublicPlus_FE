import { create } from 'zustand';

interface FacilityUIState {
  activeTab: 'info' | 'review' | 'rules';
  isLiked: boolean;
  setActiveTab: (tab: 'info' | 'review' | 'rules') => void;
  toggleLike: () => void;
}

export const useFacilityStore = create<FacilityUIState>(set => ({
  activeTab: 'info',
  isLiked: false,
  setActiveTab: tab => set({ activeTab: tab }),
  toggleLike: () => set(state => ({ isLiked: !state.isLiked }))
}));
