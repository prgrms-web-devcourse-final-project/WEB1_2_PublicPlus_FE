// app/facilities/page.tsx
import {
  FacilityCard,
  FacilityCardProps
} from '@/components/common/FacilityCard';

const facilities: FacilityCardProps[] = [
  {
    image: '/jjang.jpeg',
    title: '보라매공원테니스장 1번 코트',
    price: '5,000',
    tags: ['국민체육센터', '주차장 무료', '예약필수'],
    reservationType: '온라인 직접 예약' // 리터럴 타입과 일치해야 함
  },
  {
    image: '/jjang.jpeg',
    title: '보라매공원테니스장 2번 코트',
    price: '5,000',
    tags: ['와이파이 제공', '주차장 무료'],
    reservationType: '온라인 직접 예약'
  }
];

export default function FacilitiesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">공공 체육시설</h1>
      <div className="flex flex-col gap-4">
        {facilities.map((facility, index) => (
          <FacilityCard
            key={index}
            {...facility}
          />
        ))}
      </div>
    </main>
  );
}
