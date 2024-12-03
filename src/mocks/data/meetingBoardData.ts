export interface Meeting {
  mbId: number;
  sportType: string;
  mbTitle: string;
  mbContent: string;
  mbDate: string;
  mbTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  mbLocation: string;
  mbHost: string;
  maxParticipants: number;
}

export const mockMeetings: Meeting[] = [
  {
    mbId: 1,
    sportType: 'SOCCER',
    mbTitle: '주말 축구 모임',
    mbContent: '함께 축구하실 분들 모집합니다',
    mbDate: '2024-12-15',
    mbTime: { hour: 10, minute: 0, second: 0, nano: 0 },
    mbLocation: '서울시 강남구 XX공원',
    mbHost: 'user1',
    maxParticipants: 12
  }
];
