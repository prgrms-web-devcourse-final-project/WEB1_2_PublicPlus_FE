import { MeetingBoardRequestDTO } from '@/api/generated';
import { api } from '@/shared/api/client';

export const meetingBoardService = {
  createMeetingBoard: async (
    meetingBoardData: MeetingBoardRequestDTO
  ): Promise<void> => {
    await api.meetingBoard.createMeetingBoard(meetingBoardData);
  },

  deleteMeetingBoard: async (mbId: number): Promise<void> => {
    await api.meetingBoard.deleteMeetingBoard(mbId);
  },

  getAllMeetingBoards: async (): Promise<object> => {
    const { data } = await api.meetingBoard.getAllMeetingBoards();
    return data;
  },

  getMeetingBoardById: async (mbId: number): Promise<object> => {
    const { data } = await api.meetingBoard.getMeetingBoardById(mbId);
    return data;
  },

  updateMeetingBoard: async (
    mbId: number,
    meetingBoardData: MeetingBoardRequestDTO
  ): Promise<void> => {
    await api.meetingBoard.updateMeetingBoard(mbId, meetingBoardData);
  }
};
