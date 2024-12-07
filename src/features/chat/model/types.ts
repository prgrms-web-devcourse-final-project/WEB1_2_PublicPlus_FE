export interface ChatRoom {
  id: string;
  name: string;
  latestTimestamp: string;
  type: 'group' | 'personal';
}

export interface SideModalProps {
  roomInfo: ChatRoom;
  onClose: () => void;
}
