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
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' }
] as const;

export const PRICE_TYPES = [
  { value: 1, label: '무료' },
  { value: 0, label: '유료' }
] as const;
