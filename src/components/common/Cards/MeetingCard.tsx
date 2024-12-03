import { Tag } from '../Tag';
import { MeetingBoardRequestDTO } from '@/api/generated';
import { LinkCard } from './LinkCard';

interface MeetingCardProps extends Omit<MeetingBoardRequestDTO, 'id'> {
  image?: string;
  maxMembers: number;
  tags: string[];
  id: string;
  domain: string;
}

export const MeetingCard = ({
  id,
  mbTitle,
  mbContent,
  mbDate,
  mbTime,
  mbLocation,
  maxParticipants,
  image,
  maxMembers,
  tags = [],
  domain
}: MeetingCardProps) => (
  <LinkCard
    key={id}
    imageSrc={image || '/jjang.jpeg'}
    imageAlt={mbTitle}
    title={mbTitle}
    content={
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center">{mbContent}</p>
        <p className="flex items-center">{mbLocation}</p>
        <p className="flex items-center">
          {mbDate} / {mbTime},
        </p>
        <p className="flex items-center">
          {maxParticipants}/{maxMembers || 0}명
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
    domain={domain}
    id={id}
  />
);
