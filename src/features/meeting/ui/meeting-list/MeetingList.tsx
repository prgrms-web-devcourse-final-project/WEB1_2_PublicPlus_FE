'use client';

import { MeetingBoardRequestDTO } from '@/shared/api/generated';
import React from 'react';
import { useMeetingBoards } from '@/features/meeting/model/queries';
import { MeetingCard } from '@/widgets/meeting-card/ui/MeetingCard';

const MeetingBoardList = () => {
  const { data, isLoading } = useMeetingBoards();

  if (isLoading)
    return (
      <div className="p-4">
        <p className="text-gray-500">모임 목록을 불러오는 중입니다...</p>
      </div>
    );

  if (!data || !Array.isArray(data) || data.length === 0)
    return (
      <div className="p-4">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  console.log('모임 목록 조회: ', data);

  return (
    <div className="space-y-4">
      {data.map((meeting: MeetingBoardRequestDTO) => (
        <MeetingCard
          key={meeting.mbId}
          sportType={meeting.sportType}
          mbTitle={meeting.mbTitle}
          mbContent={meeting.mbContent}
          startDate={meeting.startTime?.slice(0, 10)}
          startTime={meeting.startTime?.slice(11, 19)}
          endDate={meeting.endTime?.slice(0, 10)}
          endTime={meeting.endTime?.slice(11, 19)}
          mbLocation={meeting.mbLocation}
          currentMembers={meeting.currentMembers || 0} // currentMembers가 없으면 0으로 설정
          maxParticipants={meeting.maxParticipants}
          tags={meeting.tags || []}
          domain="meeting"
          id={meeting.mbId}
        />
      ))}
    </div>
  );
};

export default MeetingBoardList;
