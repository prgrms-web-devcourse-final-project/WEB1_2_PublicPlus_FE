import { MeetingBoardRequestDTO } from '@/api/generated';
import Image from 'next/image';

interface MeetingHeaderProps {
  meeting: MeetingBoardRequestDTO & {
    currentParticipants: number;
    meetingImage: string;
    meetingName: string;
  };
}

export function MeetingHeader({ meeting }: MeetingHeaderProps) {
  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem]">
        <Image
          src={meeting.meetingImage}
          alt={meeting.meetingName}
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
          <span className="inline-block rounded bg-blue-100 px-2 py-1 text-sm text-blue-600">
            {meeting.sportType}
          </span>
        </div>
        <h1 className="mb-2 text-xl font-bold">{meeting.mbTitle}</h1>
        <div className="mb-4 flex items-center text-sm text-gray-600">
          <span className="mr-4">주최자: {meeting.mbHost}</span>
          <span>
            참여인원: {meeting.currentParticipants}/{meeting.maxParticipants}명
          </span>
        </div>
      </div>
    </>
  );
}
