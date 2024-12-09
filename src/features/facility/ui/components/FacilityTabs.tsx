import { useFacilityStore } from '../../model/store';

type TabType = 'info' | 'review' | 'rules';

interface TabMenuItem {
  label: string;
  value: TabType;
}

export const FacilityTabs = () => {
  const { activeTab, setActiveTab } = useFacilityStore();

  const tabMenu: TabMenuItem[] = [
    { label: '상세정보', value: 'info' },
    { label: '이용 후기', value: 'review' }
  ];

  return (
    <div className="flex border-b bg-white">
      {tabMenu.map((item, index) => (
        <button
          key={index}
          className={`flex-1 py-3 text-center ${
            activeTab === item.value
              ? 'border-b-2 border-blue-500 font-bold text-blue-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab(item.value)}>
          {item.label}
        </button>
      ))}
    </div>
  );
};
