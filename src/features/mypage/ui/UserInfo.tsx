import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Cards/Card';

export const UserInfo = () => {
  return (
    <div className="space-y-4">
      <Card
        title="내 소개"
        content={
          <p className="text-gray-600">
            안녕하세요! 건강한 삶을 추구하며 다양한 운동을 즐깁니다.
          </p>
        }
      />

      <Card
        title="관심 운동"
        content={
          <div className="flex space-x-2">
            <Button variant="badge">🏋️ 웨이트 트레이닝</Button>
            <Button variant="badge">🚴 사이클링</Button>
            <Button variant="badge">🧘 요가</Button>
          </div>
        }
      />
    </div>
  );
};
