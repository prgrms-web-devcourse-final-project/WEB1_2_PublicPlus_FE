// components/common/cards/FacilityCard.tsx
import { Tag } from '../Tag';
import { LinkCard } from './LinkCard';

export interface FacilityCardProps {
  image?: string;
  title: string;
  price: string;
  tags: string[];
  reservationType: '국민체육센터' | '주민센터 문의' | '온라인 직접 예약';
  domain: string;
  id: string;
}

export const FacilityCard = ({
  image,
  title,
  price,
  tags,
  reservationType,
  domain,
  id
}: FacilityCardProps) => (
  <LinkCard
    imageSrc={image}
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
        <div className="mb-2 text-xs text-gray-500">
          예약 방법: {reservationType}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{price}</span> /
            기본요금
          </div>
        </div>
      </>
    }
    domain={domain}
    id={id}
  />
);
