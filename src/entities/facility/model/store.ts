import { FacilityResponseDTO } from '@/api/generated';
import { create } from 'zustand';

interface FacilityStore {
  facilities: FacilityResponseDTO[];
  setFacilities: (facilities: FacilityResponseDTO[]) => void;
}

export const useFacilityStore = create<FacilityStore>(set => ({
  facilities: [],
  setFacilities: facilities => set({ facilities })
}));
