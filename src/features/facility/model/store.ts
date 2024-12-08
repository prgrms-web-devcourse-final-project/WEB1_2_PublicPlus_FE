import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InitializeLikeParams, LikeStates } from '../like/types';

interface FacilityUIState {
  activeTab: 'info' | 'review' | 'rules';
  likeStates: LikeStates;
  setActiveTab: (tab: 'info' | 'review' | 'rules') => void;
  initializeLike: (facilityId: string, state: InitializeLikeParams) => void;
  toggleLike: (facilityId: string) => void;
  updateLikeCount: (facilityId: string, count: number) => void;
  isLiked: (facilityId: string) => boolean;
  getLikeCount: (facilityId: string) => number;
  revertLikeState: (facilityId: string) => void;
}

export const useFacilityStore = create<FacilityUIState>()(
  persist(
    (set, get) => ({
      activeTab: 'info',
      likeStates: {},

      setActiveTab: tab => set({ activeTab: tab }),

      initializeLike: (facilityId, { isLiked, count }) =>
        set(state => {
          // 이미 존재하는 상태가 있다면 유지, 없으면 새로 설정
          const existingState = state.likeStates[facilityId];
          return {
            likeStates: {
              ...state.likeStates,
              [facilityId]: {
                isLiked: isLiked ?? existingState?.isLiked ?? false,
                count: count ?? existingState?.count ?? 0
              }
            }
          };
        }),

      toggleLike: facilityId =>
        set(state => {
          const currentState = state.likeStates[facilityId];
          if (!currentState) return state;

          return {
            likeStates: {
              ...state.likeStates,
              [facilityId]: {
                isLiked: !currentState.isLiked,
                count: currentState.count + (currentState.isLiked ? -1 : 1)
              }
            }
          };
        }),

      updateLikeCount: (facilityId, count) =>
        set(state => ({
          likeStates: {
            ...state.likeStates,
            [facilityId]: {
              ...state.likeStates[facilityId],
              count
            }
          }
        })),

      isLiked: facilityId => get().likeStates[facilityId]?.isLiked || false,

      getLikeCount: facilityId => get().likeStates[facilityId]?.count || 0,

      revertLikeState: facilityId =>
        set(state => {
          const currentState = state.likeStates[facilityId];
          if (!currentState) return state;

          return {
            likeStates: {
              ...state.likeStates,
              [facilityId]: {
                isLiked: !currentState.isLiked,
                count: currentState.count + (currentState.isLiked ? 1 : -1)
              }
            }
          };
        })
    }),
    {
      name: 'facility-storage'
    }
  )
);
