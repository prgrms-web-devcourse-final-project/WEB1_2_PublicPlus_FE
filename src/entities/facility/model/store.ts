import { Facility } from '@/entities/facility/model/types';
import { create } from 'zustand';

interface FacilityStore {
  facilities: Facility[];
  setFacilities: (facilities: Facility[]) => void;
}

export const useFacilityStore = create<FacilityStore>(set => ({
  facilities: [],
  setFacilities: facilities => set({ facilities })
}));
