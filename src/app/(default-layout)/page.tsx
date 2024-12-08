'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/widgets/HeroSection/ui/HeroSection';
import { DateSelector } from '@/features/calendar/ui/DateSelector/DateSelector';
import { FacilitySection } from '@/features/facility/ui/FacilitySection/FacilitySection';
import { MeetingSection } from '@/features/meeting/ui/MeetingSection/MeetingSection';
import { CalendarModal } from '@/features/calendar/ui/CalendarModal/CalendarModal';
import { SelectDateEvent } from '@/features/calendar/model/types';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const handleDateSelect = (info: Date | SelectDateEvent) => {
    const selectedDate = 'date' in info ? info.date : info;
    setSelectedDate(selectedDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className="flex flex-col space-y-10">
      <HeroSection />

      <DateSelector
        isOpen={isCalendarOpen}
        setIsOpen={setIsCalendarOpen}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        setIsOpen={setIsCalendarOpen}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <FacilitySection />
      <MeetingSection />
    </div>
  );
};

export default Home;
