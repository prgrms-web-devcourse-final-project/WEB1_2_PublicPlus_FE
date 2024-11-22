// components/common/cards/MeetingCard.tsx
import Image from 'next/image';
import styles from './Card.module.css';

interface MeetingCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  tags: string[];
  image?: string;
}

export const MeetingCard = ({
  title,
  date,
  time,
  location,
  currentMembers,
  maxMembers,
  tags,
  image
}: MeetingCardProps) => (
  <div className={`${styles.card} flex h-40`}>
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p className="flex items-center">
            {date} {time}
          </p>
          <p className="flex items-center">{location}</p>
          <p className="flex items-center">
            {currentMembers}/{maxMembers}명
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className={styles.cardImage}>
      <Image
        src={image || '/jjang.jpeg'}
        alt={title}
        fill
        className="rounded-lg object-cover"
      />
    </div>
  </div>
);
