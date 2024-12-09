'use client';
import { useMemo, useState } from 'react';
import { UserInfo } from './UserInfo';

type ProfileTabType = 'intro' | 'review' | 'favorites';

export const MypageTap = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('intro');

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case 'intro':
        return <UserInfo />;
    }
  }, [activeTab]);

  return (
    <div>
      <div className="flex border-b">
        {['intro'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as ProfileTabType)}
            className={`flex-1 py-3 text-center ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 font-bold text-blue-500'
                : 'text-gray-500'
            }`}>
            {tab === 'intro' ? '소개글' : ''}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent}</div>
    </div>
  );
};
