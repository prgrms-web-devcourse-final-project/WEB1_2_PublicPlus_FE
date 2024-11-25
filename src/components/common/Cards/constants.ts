import { FacilityCardProps } from './FacilityCard';

export const facilities: FacilityCardProps[] = [
  {
    image: '/jjang.jpeg',
    title: '보라매공원테니스장 1번 코트',
    price: '5,000',
    tags: ['국민체육센터', '주차장 무료', '예약필수'],
    reservationType: '온라인 직접 예약', // 리터럴 타입과 일치해야 함
    domain: '',
    id: ''
  },
  {
    image: '/jjang.jpeg',
    title: '보라매공원테니스장 2번 코트',
    price: '5,000',
    tags: ['와이파이 제공', '주차장 무료'],
    reservationType: '온라인 직접 예약',
    domain: '',
    id: ''
  }
];
export const meetings = [
  {
    title: '주말 테니스 모임',
    date: '2024.12.01',
    time: '10:00',
    location: '보라매공원테니스장 1번 코트',
    currentMembers: 2,
    maxMembers: 4,
    tags: ['초보환영', '20-30대', '주말']
  },
  {
    title: '평일 아침 테니스',
    date: '2024.12.02',
    time: '07:00',
    location: '보라매공원테니스장 2번 코트',
    currentMembers: 3,
    maxMembers: 4,
    tags: ['실력무관', '아침운동', '평일']
  }
];
