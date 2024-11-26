import { Facility, FacilityDetail } from '@/entities/facility/model/types';

// 시설 목록 데이터
export const facilities: Facility[] = [
  {
    facilityId: 'F001',
    facilityName: '중앙 테니스장',
    facilityCategory: 'TENNIS_COURT',
    area: '서울',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/tennis',
    reservationStartDate: '2024-12-01T09:00:00',
    reservationEndDate: '2024-12-31T18:00:00'
  },
  {
    facilityId: 'F002',
    facilityName: '강북 체육관',
    facilityCategory: 'GYM',
    area: '서울',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/gym',
    reservationStartDate: '2024-11-25T06:00:00',
    reservationEndDate: '2024-12-31T22:00:00'
  },
  {
    facilityId: 'F003',
    facilityName: '송파 축구장',
    facilityCategory: 'SOCCER_FIELD',
    area: '서울',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/soccer',
    reservationStartDate: '2024-12-10T08:00:00',
    reservationEndDate: '2025-01-15T18:00:00'
  },
  {
    facilityId: 'F004',
    facilityName: '한강 야구장',
    facilityCategory: 'BASEBALL_FIELD',
    area: '서울',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/baseball',
    reservationStartDate: '2024-11-20T09:00:00',
    reservationEndDate: '2024-12-25T18:00:00'
  },
  {
    facilityId: 'F005',
    facilityName: '광진 풋살장',
    facilityCategory: 'FUTSAL_FIELD',
    area: '서울',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/futsal',
    reservationStartDate: '2024-12-05T10:00:00',
    reservationEndDate: '2025-01-10T20:00:00'
  },
  {
    facilityId: 'F006',
    facilityName: '마포 족구장',
    facilityCategory: 'FOOT_VOLLEYBALL_FIELD',
    area: '서울',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/footvolley',
    reservationStartDate: '2024-11-30T08:00:00',
    reservationEndDate: '2024-12-31T17:00:00'
  },
  {
    facilityId: 'F007',
    facilityName: '노원 농구장',
    facilityCategory: 'BASKETBALL_FIELD',
    area: '서울',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/basketball',
    reservationStartDate: '2024-12-01T09:00:00',
    reservationEndDate: '2025-01-15T21:00:00'
  },
  {
    facilityId: 'F008',
    facilityName: '해운대 수영장',
    facilityCategory: 'SWIMMING_POOL',
    area: '부산',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/swimming1',
    reservationStartDate: '2024-11-15T07:00:00',
    reservationEndDate: '2024-12-31T21:00:00'
  },
  {
    facilityId: 'F009',
    facilityName: '서면 실내 테니스장',
    facilityCategory: 'TENNIS_FIELD',
    area: '부산',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/tennis2',
    reservationStartDate: '2024-12-01T08:00:00',
    reservationEndDate: '2025-01-15T22:00:00'
  },
  {
    facilityId: 'F010',
    facilityName: '광주 종합운동장',
    facilityCategory: 'MULTIPURPOSE_FIELD',
    area: '광주',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/multi1',
    reservationStartDate: '2024-11-20T09:00:00',
    reservationEndDate: '2024-12-31T18:00:00'
  },
  {
    facilityId: 'F011',
    facilityName: '문수 축구장',
    facilityCategory: 'FOOTBALL_FIELD',
    area: '울산',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/football2',
    reservationStartDate: '2024-12-05T09:00:00',
    reservationEndDate: '2025-01-10T18:00:00'
  },
  {
    facilityId: 'F012',
    facilityName: '대전 탁구장',
    facilityCategory: 'TABLE_TENNIS_FIELD',
    area: '대전',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/tabletennis1',
    reservationStartDate: '2024-11-25T08:00:00',
    reservationEndDate: '2024-12-31T20:00:00'
  }
];

// 시설 상세 정보 데이터
export const facilitiesDetail: FacilityDetail[] = [
  {
    facilityId: 'F001',
    facilityName: '중앙 테니스장',
    facilityCategory: 'TENNIS_COURT',
    area: '서울특별시 강남구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/tennis',
    reservationStartDate: '2024-12-01T09:00:00',
    reservationEndDate: '2024-12-31T18:00:00',
    location: { latitude: 37.4979, longitude: 127.0276 },
    facilityNumber: '02-1234-5678',
    facilityLocation: '서울특별시 강남구 테니스로 123',
    facilityDescription: '시설 주의사항 EX......',
    serviceStartDate: '2024-12-01T08:00:00',
    serviceEndDate: '2025-01-31T22:00:00',
    // 후기 관련 데이터
    externalReviews: [
      {
        title: '보라매공원 테니스장 시설 좋아요! 가족들과 함께~',
        url: 'https://blog.naver.com/example1',
        content:
          '코트 상태가 매우 좋습니다. 조명도 밝고 바닥도 깨끗해요. 다음에 또 이용하고 싶네요!',
        date: '2024.02.15',
        thumbnail: 'https://picsum.photos/200' // 적절한 이미지로 교체 필요
      },
      {
        title: '주말 테니스 즐기기 좋은 보라매공원 테니스장 후기',
        url: 'https://example.tistory.com/1',
        content:
          '코트 상태가 매우 좋습니다. 조명도 밝고 바닥도 깨끗해요. 다음에 또 이용하고 싶네요!',
        date: '2024.02.10',
        thumbnail: 'https://picsum.photos/200'
      },
      {
        title: '보라매공원 테니스장 예약방법 & 이용후기',
        url: 'https://blog.naver.com/example2',
        content:
          '코트 상태가 매우 좋습니다. 조명도 밝고 바닥도 깨끗해요. 다음에 또 이용하고 싶네요!',
        date: '2024.02.05',
        thumbnail: 'https://picsum.photos/200'
      }
    ],
    reviews: [
      {
        id: '1',
        userName: '김테니스',
        userImage: 'https://picsum.photos/200',
        date: '2024.02.20',
        content:
          '코트 상태가 매우 좋습니다. 조명도 밝고 바닥도 깨끗해요. 다음에 또 이용하고 싶네요!'
      },
      {
        id: '2',
        userName: '박라켓',
        userImage: 'https://picsum.photos/200',
        date: '2024.02.18',
        content:
          '주차도 편하고 시설도 좋았어요. 다만 주말에는 사람이 많아서 예약이 어려워요.'
      },
      {
        id: '3',
        userName: '정코트',
        date: '2024.02.15',
        content:
          '처음 이용해봤는데 만족스러웠습니다. 관리도 잘 되어있고 코트 상태도 좋네요.',
        userImage: ''
      }
    ]
  },
  {
    facilityId: 'F002',
    facilityName: '강북 체육관',
    facilityCategory: 'GYM',
    area: '서울특별시 강북구',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/gym',
    reservationStartDate: '2024-11-25T06:00:00',
    reservationEndDate: '2024-12-31T22:00:00',
    location: { latitude: 37.6399, longitude: 127.0258 },
    facilityNumber: '02-9876-5432',
    facilityLocation: '서울특별시 강북구 체육로 56',
    facilityDescription: '시설 주의사항 EX......',
    serviceStartDate: '2024-11-25T06:00:00',
    serviceEndDate: '2024-12-31T22:00:00'
  },
  {
    facilityId: 'F003',
    facilityName: '송파 축구장',
    facilityCategory: 'SOCCER_FIELD',
    area: '서울특별시 송파구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/soccer',
    reservationStartDate: '2024-12-10T08:00:00',
    reservationEndDate: '2025-01-15T18:00:00',
    location: { latitude: 37.5054, longitude: 127.1051 },
    facilityNumber: '02-5555-6666',
    facilityLocation: '서울특별시 송파구 축구로 78',
    facilityDescription: '시설 주의사항 EX......',
    serviceStartDate: '2024-12-10T08:00:00',
    serviceEndDate: '2025-01-15T18:00:00'
  },
  {
    facilityId: 'F004',
    facilityName: '한강 야구장',
    facilityCategory: 'BASEBALL_FIELD',
    area: '서울특별시 영등포구',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/baseball',
    reservationStartDate: '2024-11-20T09:00:00',
    reservationEndDate: '2024-12-25T18:00:00',
    location: { latitude: 37.5273, longitude: 126.9345 },
    facilityNumber: '02-3333-4444',
    facilityLocation: '서울특별시 영등포구 여의동로 123',
    facilityDescription: '한강 조망이 가능한 야구장, 야간 조명 완비',
    serviceStartDate: '2024-11-20T09:00:00',
    serviceEndDate: '2024-12-25T18:00:00'
  },
  {
    facilityId: 'F005',
    facilityName: '광진 풋살장',
    facilityCategory: 'FUTSAL_FIELD',
    area: '서울특별시 광진구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/futsal',
    reservationStartDate: '2024-12-05T10:00:00',
    reservationEndDate: '2025-01-10T20:00:00',
    location: { latitude: 37.5385, longitude: 127.0825 },
    facilityNumber: '02-7777-8888',
    facilityLocation: '서울특별시 광진구 능동로 456',
    facilityDescription: '인조잔디 풋살장, 更衣室 구비',
    serviceStartDate: '2024-12-05T10:00:00',
    serviceEndDate: '2025-01-10T20:00:00'
  },
  {
    facilityId: 'F006',
    facilityName: '마포 족구장',
    facilityCategory: 'FOOT_VOLLEYBALL_FIELD',
    area: '서울특별시 마포구',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/footvolley',
    reservationStartDate: '2024-11-30T08:00:00',
    reservationEndDate: '2024-12-31T17:00:00',
    location: { latitude: 37.5563, longitude: 126.9228 },
    facilityNumber: '02-2222-3333',
    facilityLocation: '서울특별시 마포구 망원로 789',
    facilityDescription: '전용 족구장, 휴게 공간 완비',
    serviceStartDate: '2024-11-30T08:00:00',
    serviceEndDate: '2024-12-31T17:00:00'
  },
  {
    facilityId: 'F007',
    facilityName: '노원 농구장',
    facilityCategory: 'BASKETBALL_FIELD',
    area: '서울특별시 노원구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/basketball',
    reservationStartDate: '2024-12-01T09:00:00',
    reservationEndDate: '2025-01-15T21:00:00',
    location: { latitude: 37.6545, longitude: 127.0568 },
    facilityNumber: '02-4444-5555',
    facilityLocation: '서울특별시 노원구 상계로 321',
    facilityDescription: '농구 전용 코트, 야간 조명 시설 완비',
    serviceStartDate: '2024-12-01T09:00:00',
    serviceEndDate: '2025-01-15T21:00:00'
  },
  {
    facilityId: 'F008',
    facilityName: '해운대 수영장',
    facilityCategory: 'SWIMMING_POOL',
    area: '부산시 해운대구',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/swimming1',
    reservationStartDate: '2024-11-15T07:00:00',
    reservationEndDate: '2024-12-31T21:00:00',
    location: { latitude: 35.1632, longitude: 129.1592 },
    facilityNumber: '051-555-6666',
    facilityLocation: '부산시 해운대구 해운대로 456',
    facilityDescription: '올림픽 규격의 수영장, 강습 프로그램 운영',
    serviceStartDate: '2024-11-15T07:00:00',
    serviceEndDate: '2024-12-31T21:00:00'
  },
  {
    facilityId: 'F009',
    facilityName: '서면 실내 테니스장',
    facilityCategory: 'TENNIS_FIELD',
    area: '부산시 부산진구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/tennis2',
    reservationStartDate: '2024-12-01T08:00:00',
    reservationEndDate: '2025-01-15T22:00:00',
    location: { latitude: 35.1569, longitude: 129.0571 },
    facilityNumber: '051-777-8888',
    facilityLocation: '부산시 부산진구 서면로 789',
    facilityDescription: '실내 냉난방 시설 완비, 전문 코치진 상주',
    serviceStartDate: '2024-12-01T08:00:00',
    serviceEndDate: '2025-01-15T22:00:00'
  },
  {
    facilityId: 'F010',
    facilityName: '광주 종합운동장',
    facilityCategory: 'MULTIPURPOSE_FIELD',
    area: '광주시 서구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/multi1',
    reservationStartDate: '2024-11-20T09:00:00',
    reservationEndDate: '2024-12-31T18:00:00',
    location: { latitude: 35.1595, longitude: 126.8526 },
    facilityNumber: '062-222-3333',
    facilityLocation: '광주시 서구 상무로 123',
    facilityDescription: '육상트랙, 축구장, 농구장 등 복합 시설',
    serviceStartDate: '2024-11-20T09:00:00',
    serviceEndDate: '2024-12-31T18:00:00'
  },
  {
    facilityId: 'F011',
    facilityName: '문수 축구장',
    facilityCategory: 'FOOTBALL_FIELD',
    area: '울산시 남구',
    priceType: false,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/football2',
    reservationStartDate: '2024-12-05T09:00:00',
    reservationEndDate: '2025-01-10T18:00:00',
    location: { latitude: 35.5384, longitude: 129.2694 },
    facilityNumber: '052-444-5555',
    facilityLocation: '울산시 남구 문수로 456',
    facilityDescription: '프로 경기장 규격, 잔디 관리 시스템 구축',
    serviceStartDate: '2024-12-05T09:00:00',
    serviceEndDate: '2025-01-10T18:00:00'
  },
  {
    facilityId: 'F012',
    facilityName: '대전 탁구장',
    facilityCategory: 'TABLE_TENNIS_FIELD',
    area: '대전시 유성구',
    priceType: true,
    facilityImage: 'https://picsum.photos/200',
    reservationURL: 'https://example.com/reserve/tabletennis1',
    reservationStartDate: '2024-11-25T08:00:00',
    reservationEndDate: '2024-12-31T20:00:00',
    location: { latitude: 36.3504, longitude: 127.3845 },
    facilityNumber: '042-666-7777',
    facilityLocation: '대전시 유성구 대학로 789',
    facilityDescription: '국제 규격 탁구대 12개 보유, 동호회 활동 가능',
    serviceStartDate: '2024-11-25T08:00:00',
    serviceEndDate: '2024-12-31T20:00:00'
  }
];
