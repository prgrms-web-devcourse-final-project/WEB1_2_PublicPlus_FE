import { ChatRoom } from './ChatRoomList';

export const ChatData: ChatRoom[] = [
  {
    id: '1',
    name: '농구에 미친 사럼들',
    latestMessage: '종합운동장에서 하는 거 맞나요??',
    latestTimestamp: '2024.11.28',
    type: 'group',
    sports: '농구',
    status: 'active'
  },
  {
    id: '2',
    name: '김철수',
    latestMessage: '오늘 저녁 러닝 ㄱ?',
    latestTimestamp: '2024.11.28',
    type: 'personal',
    sports: '',
    status: 'completed'
  },
  {
    id: '3',
    name: '축구 동호회',
    latestMessage: '다음 경기 일정 잡자',
    latestTimestamp: '2024.11.27',
    type: 'group',
    sports: '축구',
    status: 'active'
  },
  {
    id: '4',
    name: '이영희',
    latestMessage: '테니스 레슨 끝났어',
    latestTimestamp: '2024.11.26',
    type: 'personal',
    sports: '',
    status: 'completed'
  }
];
