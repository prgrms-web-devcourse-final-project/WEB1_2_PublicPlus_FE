'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { useToast } from '@/components/common/Toast/Toast';
import { useMeetingBoards } from '@/features/meeting/model/queries';
import './calendar-styles.css';

interface MeetingEvent {
  mbId: number;
  mbTitle: string;
  startTime: string;
  endTime: string;
  mbLocation: string;
  sportType: string;
  maxParticipants: number;
  isRecurringInstance?: boolean;
  instanceCount?: number;
}

const formatTime = (time: Date) => {
  return time.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const getSportTypeColor = (sportType: string) => {
  const colors = {
    BADMINTON: '#A7F3D0',
    BASEBALL: '#FDE047',
    BASKETBALL: '#F97316',
    SOCCER: '#10B981',
    SWIMMING: '#60A5FA',
    TENNIS: '#84CC16'
  };
  return colors[sportType as keyof typeof colors] || '#1D4ED8';
};

export const Calendar: FC = () => {
  const { data: meetings, isLoading } = useMeetingBoards();
  const router = useRouter();
  const { ToastComponent } = useToast();
  const [selectedEvents, setSelectedEvents] = useState<MeetingEvent[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = new Date(arg.dateStr);
    // 시간을 00:00:00으로 설정
    clickedDate.setHours(0, 0, 0, 0);

    const eventsOnDate =
      meetings?.filter(event => {
        const startDate = new Date(event.startTime);
        const endDate = new Date(event.endTime);

        // 날짜만 비교하기 위해 시간을 00:00:00으로 설정
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999); // 마지막 날의 끝 시간으로 설정

        // 클릭한 날짜가 시작일과 종료일 사이에 있는지 확인
        return clickedDate >= startDate && clickedDate <= endDate;
      }) || [];

    setSelectedEvents(eventsOnDate);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const meetingId = clickInfo.event.id;
    router.push(`/meeting/${meetingId}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
      </div>
    );
  }

  const calendarEvents = meetings?.map(event => ({
    id: event.mbId.toString(),
    title: event.sportType,
    start: event.startTime,
    end: event.endTime,
    extendedProps: {
      sportType: event.sportType,
      location: event.mbLocation,
      maxParticipants: event.maxParticipants,
      isRecurringInstance: event.isRecurringInstance,
      instanceCount: event.instanceCount,
      mbTitle: event.mbTitle
    }
  }));

  return (
    <div className="flex flex-col space-y-4">
      <div className="h-[600px] overflow-hidden rounded-lg bg-white p-4 shadow-lg">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next'
          }}
          dayMaxEvents={true}
          weekends={true}
          events={calendarEvents}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          height="100%"
          locale="ko"
          dayHeaderFormat={{ weekday: 'short' }}
          className="calendar-custom"
          buttonText={{
            prev: '이전',
            next: '다음'
          }}
          dayCellClassNames="hover:bg-blue-50 transition-colors cursor-pointer"
          eventContent={eventInfo => {
            const event = eventInfo.event;
            const sportType = event.extendedProps.sportType;
            const backgroundColor = getSportTypeColor(sportType);

            return (
              <div className="relative h-full w-full">
                {/* 이벤트 카드 */}
                <div className="relative z-10 cursor-pointer rounded-md pb-1 pl-3 pr-3 pt-1 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor }}
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {event.extendedProps.mbTitle}
                    </span>
                  </div>
                </div>

                {/* 띠 표시 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '2px',
                    right: '2px', // 좌우 여백
                    height: 'inherit',
                    background: `linear-gradient(to right, ${backgroundColor}99, ${backgroundColor})`,
                    borderRadius: '1.5px',
                    zIndex: 1,
                    boxShadow: `0 1px 2px ${backgroundColor}40`
                  }}
                />
              </div>
            );
          }}
        />
      </div>

      {selectedEvents.length > 0 && (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            선택한 날짜의 모임
          </h3>
          <div className="divide-y divide-gray-100">
            {selectedEvents.map((event, index) => (
              <div
                key={`${event.mbId}-${index}`}
                className="group flex cursor-pointer items-center justify-between py-4 transition-colors hover:bg-gray-50"
                onClick={() => router.push(`/meeting/${event.mbId}`)}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: getSportTypeColor(event.sportType)
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {event.mbTitle}
                    </span>
                    <span className="text-sm text-gray-500">
                      {event.mbLocation}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {formatTime(new Date(event.startTime))}
                    {' ~ '}
                    {formatTime(new Date(event.endTime))}
                  </span>
                  {event.isRecurringInstance && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {event.instanceCount}회차
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ToastComponent}
    </div>
  );
};
