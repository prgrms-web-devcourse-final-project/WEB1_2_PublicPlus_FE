interface MeetingTabsProps {
  activeTab: 'info' | 'comments';
  onTabChange: (tab: 'info' | 'comments') => void;
  showComments: boolean;
}

export function MeetingTabs({
  activeTab,
  onTabChange,
  showComments
}: MeetingTabsProps) {
  return (
    <div className="flex border-b">
      <button
        className={`flex-1 py-3 text-center ${
          activeTab === 'info'
            ? 'border-b-2 border-blue-500 font-bold text-blue-500'
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange('info')}>
        모임 정보
      </button>
      {showComments && (
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'comments'
              ? 'border-b-2 border-blue-500 font-bold text-blue-500'
              : 'text-gray-500'
          }`}
          onClick={() => onTabChange('comments')}>
          댓글
        </button>
      )}
    </div>
  );
}
