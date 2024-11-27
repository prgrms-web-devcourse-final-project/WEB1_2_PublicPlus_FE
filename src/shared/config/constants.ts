// 필터 옵션 상수
export const FACILITY_CATEGORIES = [
  { value: 'FOOTBALL_FIELD', label: '축구장' },
  { value: 'FUTSAL_FIELD', label: '풋살장' },
  { value: 'BASEBALL_FIELD', label: '야구장' },
  { value: 'TENNIS_FIELD', label: '테니스장' },
  { value: 'BASKETBALL_FIELD', label: '농구장' },
  { value: 'VOLLEYBALL_FIELD', label: '배구장' },
  { value: 'TABLE_TENNIS_FIELD', label: '탁구장' },
  { value: 'BADMINTON_FIELD', label: '배드민턴장' },
  { value: 'FOOT_VOLLEYBALL_FIELD', label: '족구장' },
  { value: 'SWIMMING_POOL', label: '수영장' },
  { value: 'GYM', label: '체육관' },
  { value: 'MULTIPURPOSE_FIELD', label: '다목적경기장' }
] as const;

export const AREAS = [
  { value: '강남구' },
  { value: '강동구' },
  { value: '강북구' },
  { value: '강서구' },
  { value: '관악구' },
  { value: '광진구' },
  { value: '구로구' },
  { value: '금천구' },
  { value: '노원구' },
  { value: '도봉구' },
  { value: '동대문구' },
  { value: '동작구' },
  { value: '마포구' },
  { value: '서대문구' },
  { value: '서초구' },
  { value: '성동구' },
  { value: '성북구' },
  { value: '송파구' },
  { value: '양천구' },
  { value: '영등포구' },
  { value: '용산구' },
  { value: '은평구' },
  { value: '종로구' },
  { value: '중구' },
  { value: '중랑구' }
] as const;

export const PRICE_TYPES = [
  { value: 1, label: '무료' },
  { value: 0, label: '유료' }
] as const;
