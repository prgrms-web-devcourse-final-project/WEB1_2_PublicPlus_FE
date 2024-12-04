import { create } from 'zustand';

interface MeetingBoardState {
  selectedMeeting: any | null;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit';

  setSelectedMeeting: (meeting: any | null) => void;
  openCreateModal: () => void;
  openEditModal: (meeting: any) => void;
  closeModal: () => void;
}

export const useMeetingBoardStore = create<MeetingBoardState>(set => ({
  selectedMeeting: null,
  isModalOpen: false,
  modalMode: 'create',

  setSelectedMeeting: meeting => set({ selectedMeeting: meeting }),

  openCreateModal: () =>
    set({
      isModalOpen: true,
      modalMode: 'create',
      selectedMeeting: null
    }),

  openEditModal: meeting =>
    set({
      isModalOpen: true,
      modalMode: 'edit',
      selectedMeeting: meeting
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      selectedMeeting: null
    })
}));
