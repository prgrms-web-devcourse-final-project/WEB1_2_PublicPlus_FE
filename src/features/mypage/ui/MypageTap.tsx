'use client';
import { useMemo, useState } from 'react';
import { UserInfo } from './UserInfo';
import { UserReviews } from '@/features/review/ui/UserReviews';

type ProfileTabType = 'intro' | 'review' | 'favorites';

export const MypageTap = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('intro');

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case 'intro':
        return <UserInfo />;
      case 'review':
        return <UserReviews />;
    }
  }, [activeTab]);

  return (
    <div>
      <div className="mb-8 flex justify-start">
        {['intro', 'review'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as ProfileTabType)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-primary-800 text-primary-800'
                : 'border-b-2 border-white text-gray-500'
            }`}>
            {tab === 'intro'
              ? '소개글'
              : tab === 'review'
                ? '내 후기'
                : '즐겨찾기'}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent}</div>
    </div>
  );
};
