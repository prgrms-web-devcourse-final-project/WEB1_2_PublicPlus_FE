export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '공공플러스',
  description:
    '공공플러스는 공공체육시설 정보를 제공하고 함께 운동할 메이트를 찾을 수 있는 서비스입니다. AI가 추천하는 시설 정보와 실시간 모임 매칭으로 더 즐거운 운동을 시작하세요.',
  url: process.env.NEXT_PUBLIC_API_URL,
  keywords: [
    '공공체육시설',
    '운동 메이트',
    '운동 모임',
    '스포츠 매칭',
    '체육시설 예약',
    '운동 파트너',
    '운동 친구',
    '공공시설',
    'AI 추천',
    '실시간 매칭'
  ]
} as const;
