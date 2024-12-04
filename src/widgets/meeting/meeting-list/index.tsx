'use client';

import { MeetingBoardRequestDTO } from '@/api/generated';
import { MeetingCard } from '@/components/common/Cards/MeetingCard';
import React from 'react';
import { useMeetingBoards } from '@/features/meeting/model/queries';

// 시간을 `hh:mm` 형식으로 변환하는 함수
const formatTime = (time: { hour: number; minute: number }) => {
  const hours = time.hour.toString().padStart(2, '0');
  const minutes = time.minute.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const MeetingBoardList = () => {
  const { data, isLoading } = useMeetingBoards();

  console.log('모임 목록 data', data);

  if (isLoading) return <p>모임 목록을 불러오는 중입니다...</p>;

  if (!data || !Array.isArray(data) || data.length === 0)
    return <p>검색 결과가 없습니다.</p>;

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
          mbLocation={meeting.mbLocation}
          mbHost={meeting.mbHost}
          maxParticipants={meeting.maxParticipants}
          tags={meeting.tags || []} // tags가 없을 경우 빈 배열 처리
          domain="meeting"
          id={meeting.mbId}
        />
      ))}
    </div>
  );
};

export default MeetingBoardList;
