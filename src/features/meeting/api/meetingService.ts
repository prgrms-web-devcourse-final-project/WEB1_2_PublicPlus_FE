import { MeetingBoardRequestDTO } from '@/shared/api/generated';
import { api } from '@/shared/api/client';

export const meetingService = {
  createMeetingBoard: async (
    meetingBoardData: MeetingBoardRequestDTO,
    tokens: string
  ): Promise<void> => {
    console.log('토큰: ', tokens, '모임 생성 데이터: ', meetingBoardData);
    await api.activityMeetingBoard.createMeetingActivity(meetingBoardData, {
      headers: {
        Authorization: `Bearer ${tokens}`
      }
    });
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
    await api.activityMeetingBoard.updateMeetingActivity(
      mbId,
      meetingBoardData
    );
  }
};
