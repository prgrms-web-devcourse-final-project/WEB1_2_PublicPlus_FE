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
import { generateRecurringDates } from '@/shared/lib/utils/dateUtils';
import './calendar-styles.css';

const formatTime = (time?: { hour: number; minute: number }) => {
  if (!time) return '';
  return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
};

export const Calendar: FC = () => {
  const { data: meetings, isLoading } = useMeetingBoards();
  const router = useRouter();
  const { showToast, ToastComponent } = useToast();
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.dateStr;
    const eventsOnDate = allEvents.filter(
      event => event.mbDate === clickedDate
    );
    setSelectedEvents(eventsOnDate);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const meetingId = clickInfo.event.id.split('-')[0];
    router.push(`/meeting/${meetingId}`);
  };

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
      </div>
    );

  const allEvents =
    meetings?.flatMap(meeting => generateRecurringDates(meeting)) || [];

  const calendarEvents = allEvents.map(event => {
    // 시작 시간 문자열 생성
    const startHour = event.mbTime.hour.toString().padStart(2, '0');
    const startMinute = event.mbTime.minute.toString().padStart(2, '0');
    const startTimeStr = `${event.mbDate}T${startHour}:${startMinute}:00`;

    // 종료 시간 계산 (2시간 후)
    const endHour = (event.mbTime.hour + 2).toString().padStart(2, '0');
    const endTimeStr = `${event.mbDate}T${endHour}:${startMinute}:00`;

    return {
      id: event.isRecurringInstance
        ? `${event.recurringParentId}-${event.instanceCount}`
        : event.mbId.toString(),
      title: event.sportType,
      start: startTimeStr,
      end: endTimeStr,
      extendedProps: {
        sportType: event.sportType,
        location: event.mbLocation,
        maxParticipants: event.maxParticipants,
        tags: event.tags,
        isRecurring: event.isRecurring,
        isRecurringInstance: event.isRecurringInstance,
        instanceCount: event.instanceCount,
        originalEvent: event
      }
    };
  });

  return (
    <div className="flex flex-col space-y-4">
      <div className="h-[600px] rounded-lg bg-white shadow-sm">
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
          eventContent={eventInfo => (
            <div className="cursor-pointer text-blue-500">
              {'·'} {eventInfo.event.title}
            </div>
          )}
        />
      </div>

      {selectedEvents.length > 0 && (
        <div className="space-y-2 rounded-lg bg-white px-4">
          {selectedEvents.map((event, index) => (
            <div
              key={`${event.mbId}-${index}`}
              className="flex cursor-pointer items-center justify-between border-b border-gray-100 py-3 last:border-0"
              onClick={() => router.push(`/meeting/${event.mbId}`)}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>{event.mbTitle}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>{event.mbTime ? formatTime(event.mbTime) : ''}</span>
                {event.isRecurringInstance && (
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800">
                    {event.instanceCount}회차
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {ToastComponent}
    </div>
  );
};
