// components/common/cards/FacilityCard.tsx
import { Card } from './Card';
import { Tag } from '../Tag';

export interface FacilityCardProps {
  image?: string;
  title: string;
  price: string;
  tags: string[];
  reservationType: '국민체육센터' | '주민센터 문의' | '온라인 직접 예약';
}

export const FacilityCard = ({
  image,
  title,
  price,
  tags,
  reservationType
}: FacilityCardProps) => (
  <Card
    image={image || '/default-facility-image.jpg'}
    imageAlt={title}
    title={title}
    className="min-h-[10rem]"
    content={
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <Tag
            key={tag}
            label={tag}
          />
        ))}
      </div>
    }
    footer={
      <>
        <div className="mb-2 text-xs text-gray-500">{reservationType}</div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{price}원</span> /
            기본요금
          </div>
        </div>
      </>
    }
  />
);
