export function ChatRoomTabs({
  activeTab,
  setActiveTab
}: {
  activeTab: 'group' | 'personal';
  setActiveTab: (tab: 'group' | 'personal') => void;
}) {
  return (
    <div className="mb-8 flex">
      <button
        className={`flex-1 p-3 ${activeTab === 'group' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
        onClick={() => setActiveTab('group')}>
        그룹 채팅
      </button>
      <button
        className={`flex-1 p-3 ${activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
        onClick={() => setActiveTab('personal')}>
        개인 채팅
      </button>
    </div>
  );
}
