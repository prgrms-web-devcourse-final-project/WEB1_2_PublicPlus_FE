// components/common/cards/MeetingCard.tsx
import { Card } from './Card';
import { Tag } from '../Tag';

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
  <Card
    image={image || '/jjang.jpeg'}
    imageAlt={title}
    title={title}
    content={
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center">
          {date} {time}
        </p>
        <p className="flex items-center">{location}</p>
        <p className="flex items-center">
          {currentMembers}/{maxMembers}명
        </p>
      </div>
    }
    footer={
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <Tag
            key={tag}
            label={tag}
          />
        ))}
      </div>
    }
  />
);
