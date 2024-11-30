import { create } from 'zustand';

interface ReviewStore {
  isWriting: boolean;
  setIsWriting: (isWriting: boolean) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
}

export const useReviewStore = create<ReviewStore>(set => ({
  isWriting: false,
  setIsWriting: isWriting => set({ isWriting }),

  editingId: null,
  setEditingId: id => set({ editingId: id })
}));
