'use client';

import { useRef, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '@/shared/ui/components/Card/Card';
import { CalendarModal } from '../CalendarModal/CalendarModal';
import { getDatesForCurrentMonth, getDayName, isToday } from '../../lib/utils';
import type { DateSelectorProps } from '../../model/types';

export const DateSelector = ({
  selectedDate,
  onDateSelect,
  isOpen,
  setIsOpen
}: DateSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const selectedButton = document.querySelector(
      `[data-date="${selectedDate.getDate()}"]`
    );
    if (selectedButton) {
      selectedButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedDate]);

  return (
    <>
      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium">
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="text-blue-500">
            <CalendarIcon className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={containerRef}
          className="overflow-x-auto"
          style={{ overscrollBehavior: 'none' }}>
          <div className="flex min-w-full space-x-4 pb-2">
            {getDatesForCurrentMonth(selectedDate).map(date => (
              <button
                key={date.getDate()}
                data-date={date.getDate()}
                onClick={() => onDateSelect(date)}
                className={`flex min-w-[40px] flex-col items-center rounded-full p-2 ${
                  isToday(date)
                    ? 'bg-blue-500 text-white'
                    : date.getTime() === selectedDate.getTime()
                      ? 'bg-blue-100'
                      : ''
                }`}>
                <span className="text-sm">{getDayName(date)}</span>
                <span className="text-lg font-medium">{date.getDate()}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <CalendarModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedDate={selectedDate}
        onDateSelect={date => {
          onDateSelect(date);
          setIsOpen(false);
        }}
      />
    </>
  );
};
