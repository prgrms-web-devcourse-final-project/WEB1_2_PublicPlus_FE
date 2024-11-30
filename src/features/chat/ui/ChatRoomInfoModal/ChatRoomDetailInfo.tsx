import { Tag } from '@/components/common/Tag';
import { User } from 'lucide-react';
import { ChatRoom } from '../../types';

export const ChatRoomDetailInfo = ({ roomInfo }: { roomInfo: ChatRoom }) => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-start space-x-4">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-200">
          {roomInfo.type === 'group' ? '👥' : '👤'}
        </div>
        <div className="flex items-center space-x-4">
          <h3 className="text-m font-semibold text-gray-700">
            {roomInfo.name}
          </h3>
          {roomInfo.sports && (
            <Tag
              variant="line"
              label={roomInfo.sports}
            />
          )}
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h4 className="mb-2 text-xs font-medium text-gray-900">
            채팅방 유형
          </h4>
          <Tag
            variant="line"
            label={roomInfo.type === 'group' ? '그룹 채팅' : '개인 채팅'}
          />
        </div>

        <div>
          <h4 className="mb-4 text-xs text-gray-800">상태</h4>
          <p
            className={`text-sm ${roomInfo.status === 'active' ? 'text-primary-600' : 'text-gray-600'}`}>
            {roomInfo.status === 'active' ? '진행중' : '완료됨'}
          </p>
        </div>
        <div className="space-y-6">
          <h4 className="text-xs text-gray-800">모임정보</h4>
          <p className="text-sm">장소 : </p>
          <p className="text-sm">일시 : </p>
        </div>
        <div className="space-y-6">
          <h4 className="text-xs text-gray-800">참가자</h4>
          <div className="mb-4 flex items-center justify-start space-x-4">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <User />
            </div>
            <div className="flex space-x-4">
              <h3 className="text-sm text-gray-700">사용자1</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
