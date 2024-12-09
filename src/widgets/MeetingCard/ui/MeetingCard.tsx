import { LinkCard } from '@/shared/ui/components/card/LinkCard';
import {
  MeetingBoardRequestDTO,
  MeetingBoardRequestDTOSportTypeEnum
} from '@/shared/api/generated';
import { Tag } from '@/shared/ui/components/tag/Tag';

const MeetingBoardSportTypeEnum = {
  BADMINTON: '🏸 배드민턴',
  BASEBALL: '⚾ 야구',
  BASKETBALL: '🏀 농구',
  SOCCER: '⚽ 축구',
  SWIMMING: '🏊‍♂️ 수영',
  TENNIS: '🎾 테니스'
};

const CategoryColors = {
  BADMINTON: '#A7F3D0',
  BASEBALL: '#FDE047',
  BASKETBALL: '#F97316',
  SOCCER: '#6EE7B7',
  SWIMMING: '#60A5FA',
  TENNIS: '#84CC16'
};

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
      <div className="mt-2 flex flex-col gap-2">
        <div className="mb-2 flex gap-2 text-sm text-gray-500">
          <svg
            className="h-5 w-5"
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
          <span>모임 장소: {mbLocation}</span>
        </div>
        <div className="mb-2 flex gap-2 text-sm text-gray-500">
          <svg
            className="h-5 w-5"
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
          <span>
            모임 기간:
            {startDate ? ` ${startDate}` : ''} {endDate ? ` ~ ${endDate}` : ''}
          </span>
        </div>
        <div className="mb-2 flex gap-2 text-sm text-gray-500">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>
            참여 인원: {currentMembers || 0}/{maxParticipants}명
          </span>
        </div>
      </div>
    }
    footer={
      <div className="flex gap-2">
        <Tag
          label={
            sportType
              ? (MeetingBoardSportTypeEnum[sportType] ?? '기타')
              : '기타'
          }
          styleName={{
            className:
              'inline-block rounded-lg px-3 py-1.5 text-base font-medium',
            backgroundColor:
              CategoryColors[sportType as keyof typeof CategoryColors] ??
              '#E5E7EB'
          }}
        />
      </div>
    }
    domain={domain}
    id={id}
  />
);
