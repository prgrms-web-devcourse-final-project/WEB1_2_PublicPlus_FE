interface MeetingInfoProps {
  meeting?: {
    mbHostId: string;
    startTime: string;
    endTime: string;
    mbTitle: string;
    sportType: string;
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
    <div className="space-y-6">
      <ul className="space-y-2 text-gray-700">
        <li>• 관리자: {meeting.mbHostId}</li>
        <li>• 시작 일시: {startTimeFormatted}</li>
        <li>• 종료 일시: {endTimeFormatted}</li>
        <li>• 제목: {meeting.mbTitle}</li>
        <li>• 종목: {meeting.sportType}</li>
        <li>• 설명: {meeting.mbContent}</li>
        <li>• 장소: {meeting.mbLocation}</li>
        <li>• 참여 인원: {meeting.maxParticipants}명</li>
      </ul>
    </div>
  );
}
