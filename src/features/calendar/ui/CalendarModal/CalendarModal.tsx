'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/shared/ui/components/Button/Button';
import { Dispatch, SetStateAction } from 'react';
import { DateSelectHandler } from '../../model/types';

interface CalendarModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date;
  onDateSelect: DateSelectHandler;
}

export const CalendarModal = ({
  isOpen,
  setIsOpen,
  selectedDate,
  onDateSelect
}: CalendarModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      style={{ margin: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-black bg-opacity-50 p-4">
      <div className="h-[80%] w-[80%] rounded-lg bg-white p-4 shadow-lg">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={selectedDate}
          selectable={true}
          select={info => onDateSelect(info.start)}
          headerToolbar={{
            start: 'prev',
            center: 'title',
            end: 'next'
          }}
          height="100%"
          locale="ko"
          dayHeaderFormat={{ weekday: 'short' }}
          slotLaneClassNames="calendar-custom"
          dayCellClassNames={arg => {
            if (arg.date.toDateString() === selectedDate.toDateString()) {
              return 'selected-date';
            }
            return '';
          }}
        />
        <div className="mt-6 flex justify-end">
          <Button
            variant="gray"
            onClick={() => setIsOpen(false)}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};
