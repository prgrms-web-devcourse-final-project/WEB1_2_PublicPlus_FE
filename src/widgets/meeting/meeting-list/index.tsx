'use client';

import { MeetingBoardRequestDTO } from '@/api/generated';
import { MeetingCard } from '@/components/common/Cards/MeetingCard';
import React from 'react';
import { useMeetingBoards } from '@/features/meeting/model/queries';

// 시간을 `hh:mm` 형식으로 변환하는 함수
const formatTime = (time?: { hour: number; minute: number }) => {
  if (!time) return '';

  const hours = time.hour.toString().padStart(2, '0');
  const minutes = time.minute.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

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

  return (
    <div className="space-y-4">
      {data.map((meeting: MeetingBoardRequestDTO) => (
        <MeetingCard
          key={meeting.mbId}
          sportType={meeting.sportType}
          mbTitle={meeting.mbTitle}
          mbContent={meeting.mbContent}
          mbDate={meeting.mbDate}
          mbTime={meeting.mbTime ? formatTime(meeting.mbTime) : ''}
          endDate={meeting.recurringSchedule?.endDate}
          mbLocation={meeting.mbLocation}
          mbHost={meeting.mbHost}
          currentMembers={meeting.currentMembers}
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
