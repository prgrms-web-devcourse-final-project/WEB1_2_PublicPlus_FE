import { LinkCard } from '@/shared/ui/components/card/LinkCard';
import {
  MeetingBoardRequestDTO,
  MeetingBoardRequestDTOSportTypeEnum
} from '@/shared/api/generated';
import { Tag } from '@/shared/ui/components/tag/Tag';

interface MeetingCardProps extends Omit<MeetingBoardRequestDTO, 'id'> {
  image?: string;
  currentMembers: number;
  tags: string[];
  id: string;
  domain: string;
  endDate: string;
  startDate: string;
  sportType: MeetingBoardRequestDTOSportTypeEnum;
}

export const MeetingCard = ({
  id,
  mbTitle,
  endDate,
  startDate,
  mbLocation,
  maxParticipants,
  image,
  currentMembers,
  sportType,
  domain
}: MeetingCardProps) => (
  <LinkCard
    key={id}
    imageSrc={image || '/jjang.jpeg'}
    imageAlt={mbTitle}
    title={mbTitle}
    content={
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {mbLocation}
        </p>
        <p className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {startDate ? ` ${startDate}` : ''} {endDate ? ` ~ ${endDate}` : ''}
        </p>
        <p className="flex items-center">
          {currentMembers || 0}/{maxParticipants}명
        </p>
      </div>
    }
    footer={<Tag label={sportType} />}
    domain={domain}
    id={id}
  />
);
