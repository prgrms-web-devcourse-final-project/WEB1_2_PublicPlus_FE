import { MeetingBoardRequestDTO } from '@/shared/api/generated';
import Image from 'next/image';
import { Tag } from '@/shared/ui/components/tag/Tag';

interface MeetingHeaderProps {
  meeting: MeetingBoardRequestDTO & {
    currentParticipants: number;
    meetingImage: string;
    meetingName: string;
  };
}

type SportType =
  | 'BADMINTON'
  | 'BASEBALL'
  | 'BASKETBALL'
  | 'SOCCER'
  | 'SWIMMING'
  | 'TENNIS';

const MeetingBoardSportTypeEnum: Record<SportType, string> = {
  BADMINTON: '🏸 배드민턴',
  BASEBALL: '⚾ 야구',
  BASKETBALL: '🏀 농구',
  SOCCER: '⚽ 축구',
  SWIMMING: '🏊‍♂️ 수영',
  TENNIS: '🎾 테니스'
};

const CategoryColors: Record<SportType, string> = {
  BADMINTON: '#A7F3D0',
  BASEBALL: '#FDE047',
  BASKETBALL: '#F97316',
  SOCCER: '#6EE7B7',
  SWIMMING: '#60A5FA',
  TENNIS: '#84CC16'
};

export function MeetingHeader({ meeting }: MeetingHeaderProps) {
  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem]">
        <Image
          src={meeting.meetingImage || '/jjang.jpeg'}
          alt={meeting.meetingName || '이미지 설명'}
          fill
          className="object-cover"
          priority
        />
        {/* <button
          onClick={toggleLike}
          className="absolute right-4 top-4 rounded-full bg-white p-2">
          <Image
            src={isLiked ? '/icons/heart-filled.png' : '/icons/heart.png'}
            alt="좋아요"
            width={24}
            height={24}
          />
        </button> */}
      </div>
      <div className="bg-white p-4">
        <div className="mb-4">
          <Tag
            label={MeetingBoardSportTypeEnum[meeting.sportType] ?? '기타'}
            styleName={{
              className:
                'inline-block rounded-lg px-3 py-1.5 text-base font-medium',
              backgroundColor: CategoryColors[meeting.sportType] ?? '#E5E7EB'
            }}
          />
        </div>
        <h1 className="mb-2 text-xl font-bold">{meeting.mbTitle}</h1>
        <p className="mt-2 text-gray-600">
          참여인원: {meeting.currentParticipants}/{meeting.maxParticipants}명
        </p>
      </div>
    </>
  );
}
