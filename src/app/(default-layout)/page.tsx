'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '@/components/common/Cards/Card';
import { FacilityFilters } from '@/widgets/facility/facility-filters';
import MeetingBoardList from '@/widgets/meeting/meeting-list';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Link from 'next/link';
import Image from 'next/image';
import { MainFacilityList } from '@/widgets/facility/facility-list/MainFacilityList';
import { Button } from '@/shared/ui/components/button/Button';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 현재 달의 날짜들을 생성
  const getDatesForCurrentMonth = () => {
    const dates = [];
    const currentDate = selectedDate; // selectedDate 기준으로 변경
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      dates.push(date);
    }

    return dates;
  };

  const getDayName = date => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  const isToday = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateSelect = info => {
    const selectedDate = info.date || info;
    setSelectedDate(selectedDate);
    setIsCalendarOpen(false);
  };

  // 선택된 날짜로 스크롤하는 기능
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

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = e => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden rounded-lg bg-blue-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-10 px-4 text-white">
          <Image
            src={'/images/hero-img.png'}
            alt="히어로 이미지"
            layout="fill"
            objectFit="cover"
            className="z-[-1] brightness-90"
          />
          <h1 className="mb-4 text-6xl font-bold">공공 체육 시설 & 모임</h1>
          <p className="mb-8 text-center text-xl font-bold">
            원하는 시설을 찾고 함께할 운동 메이트를 만나보세요
          </p>
          <div className="flex space-x-4">
            <Link
              href="/facility"
              className="rounded-full bg-white px-6 py-2 font-semibold text-blue-500 hover:bg-blue-50">
              시설 찾기
            </Link>
            <Link
              href="/meeting"
              className="rounded-full border-2 border-white px-6 py-2 font-semibold text-white hover:bg-white hover:text-blue-500">
              모임 찾기
            </Link>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium">
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
          </span>
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="text-blue-500">
            <CalendarIcon className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={containerRef}
          className="overflow-x-auto"
          style={{ overscrollBehavior: 'none' }}>
          <div className="flex min-w-full space-x-4 pb-2">
            {getDatesForCurrentMonth().map(date => (
              <button
                key={date.getDate()}
                data-date={date.getDate()}
                onClick={() => handleDateSelect(date)}
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

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div
          style={{ margin: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-black bg-opacity-50 p-4">
          <div className="h-[80%] w-[80%] rounded-lg bg-white p-4 shadow-lg">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={selectedDate}
              selectable={true}
              select={info => handleDateSelect(info.start)}
              headerToolbar={{
                start: 'prev',
                center: 'title',
                end: 'next'
              }}
              height="100%"
              locale="ko"
              dayHeaderFormat={{ weekday: 'short' }}
              className="calendar-custom"
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
                onClick={() => setIsCalendarOpen(false)}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Facilities Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">공공 체육 시설</h2>
          <button className="flex items-center text-blue-500">
            전체 보기
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-6">
          <FacilityFilters showSearchBar={false} />
          <MainFacilityList />
        </div>
      </div>
      {/* Meetings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">모임 추천</h2>
          <button className="flex items-center text-blue-500">
            전체 보기
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <MeetingBoardList selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default Home;
