import {
  User,
  Calendar,
  Clock,
  FileText,
  ScrollText,
  MapPin,
  Users
} from 'lucide-react';

type SportType =
  | 'BADMINTON'
  | 'BASEBALL'
  | 'BASKETBALL'
  | 'SOCCER'
  | 'SWIMMING'
  | 'TENNIS';

interface MeetingInfoProps {
  meeting?: {
    mbHostId: string;
    startTime: string;
    endTime: string;
    mbTitle: string;
    sportType: SportType;
    mbContent: string;
    mbLocation: string;
    maxParticipants: number;
  };
}

export function MeetingInfo({ meeting }: MeetingInfoProps) {
  // meeting이 없을 경우 '정보 없음'을 반환
  if (!meeting) {
    return (
      <div className="p-4 text-center text-gray-500">모임 정보가 없습니다.</div>
    );
  }

  // startTime과 endTime을 Date 객체로 변환하여 원하는 형식으로 표시
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const startTimeFormatted = meeting.startTime
    ? formatDate(meeting.startTime)
    : '정보 없음';
  const endTimeFormatted = meeting.endTime
    ? formatDate(meeting.endTime)
    : '정보 없음';

  return (
    <div className="space-y-14 p-4 pb-20 pt-10">
      <div className="divide-y divide-gray-100 text-m">
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <User className="h-5 w-5" />
            <span>관리자</span>
          </div>
          <span className="font-medium text-gray-900">{meeting.mbHostId}</span>
        </div>
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>시작 일시</span>
          </div>
          <span className="font-medium text-gray-900">
            {startTimeFormatted}
          </span>
        </div>
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>종료 일시</span>
          </div>
          <span className="font-medium text-gray-900">{endTimeFormatted}</span>
        </div>
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <FileText className="h-5 w-5" />
            <span>제목</span>
          </div>
          <span className="font-medium text-gray-900">{meeting.mbTitle}</span>
        </div>
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <ScrollText className="h-5 w-5" />
            <span className="flex-0.5">설명</span>
          </div>
          <span className="font-medium text-gray-900">{meeting.mbContent}</span>
        </div>
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>장소</span>
          </div>
          <span className="font-medium text-gray-900">
            {meeting.mbLocation}
          </span>
        </div>
        <div className="flex items-center justify-between py-6">
          <div className="flex w-80 items-center gap-3 text-gray-600">
            <Users className="h-5 w-5" />
            <span>참여 인원</span>
          </div>
          <span className="font-medium text-gray-900">
            {meeting.maxParticipants}
          </span>
        </div>
      </div>
    </div>
  );
}
