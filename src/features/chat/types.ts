export interface ChatRoom {
  id: string;
  name: string;
  latestMessage: string;
  latestTimestamp: string;
  type: 'group' | 'personal';
  sports: string;
  status: 'active' | 'completed';
}

export interface SideModalProps {
  roomInfo: ChatRoom;
  onClose: () => void;
}
