// components/common/cards/FacilityCard.tsx
import Image from 'next/image';
import styles from './Card.module.css';
import { Tag } from './Tag';

export interface FacilityCardProps {
  image?: string;
  title: string;
  price: string;
  tags: string[];
  reservationType: '국민체육센터' | '주민센터 문의' | '온라인 직접 예약';
}
// components/common/cards/FacilityCard.tsx
export const FacilityCard = ({
  image,
  title,
  price,
  tags,
  reservationType
}: FacilityCardProps) => (
  <div className={`${styles.card} flex min-h-[10rem]`}>
    <div className="mr-4 flex flex-1 flex-col justify-between gap-2">
      <div>
        <h3 className="text-md font-medium">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map(tag => (
            <Tag
              key={tag}
              label={tag}
            />
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-500">{reservationType}</div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{price}원</span> /
          기본요금
        </div>
      </div>
    </div>
    <div className={`${styles.cardImage}`}>
      <Image
        src={image || '/default-facility-image.jpg'}
        alt={title}
        fill
        className="rounded-lg object-cover"
      />
    </div>
  </div>
);
