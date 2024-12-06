// ChatStatusToggle.tsx

import { Toggle } from '@/components/common/Toggle';
export function ChatStatusToggle({
  isActiveChat,
  onToggle
}: {
  isActiveChat: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span
        className={`mb-2 mr-4 text-sm ${isActiveChat ? 'font-semibold' : 'text-gray-800'}`}>
        {isActiveChat ? '진행중 채팅' : '종료된 채팅'}
      </span>
      <div className="w-20">
        <Toggle
          isOn={isActiveChat}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}
