'use client';
import { useMemo, useState } from 'react';
import { UserInfo } from './UserInfo';

type TabType = 'intro' | 'schedule' | 'favorites';

export const MypageTap = () => {
  const [activeTab, setActiveTab] = useState<TabType>('intro');

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case 'intro':
        return <UserInfo />;
      case 'schedule':
        return <ScheduleSection />;
      case 'favorites':
        return <FavoritesSection />;
    }
  }, [activeTab]);

  return (
    <div>
      <div className="mb-4 flex justify-around">
        {['intro', 'schedule', 'favorites'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}>
            {tab === 'intro'
              ? '소개글'
              : tab === 'schedule'
                ? '일정'
                : '즐겨찾기'}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent}</div>
    </div>
  );
};

const ScheduleSection = () => <div>사용자 일정</div>;
const FavoritesSection = () => <div>즐겨찾기 목록</div>;
