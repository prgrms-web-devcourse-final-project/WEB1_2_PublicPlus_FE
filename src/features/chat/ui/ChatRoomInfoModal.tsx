'use client';
import { useState } from 'react';
import { Tag } from '@/components/common/Tag';
import { ChatRoom } from './ChatRoomList';
import { LucidePanelRightClose, User } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

interface SideModalProps {
  roomInfo: ChatRoom;
  onClose: () => void;
}
export const ChatRoomInfoModal = ({ roomInfo, onClose }: SideModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseChat = () => {
    setIsModalOpen(true);
  };

  const confirmCloseChat = () => {
    // 실제 채팅방 나가기 로직 구현
    // 예: API 호출, 상태 업데이트 등
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="absolute right-0 top-0 z-40 flex h-full w-full bg-gray-500 bg-opacity-50">
        <div
          className="h-full w-[50%] cursor-pointer bg-transparent"
          onClick={onClose}></div>
        <div className="relative flex h-full w-full flex-col bg-white transition-transform duration-500 ease-in-out">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-m font-medium text-gray-800">채팅방 정보</h2>
            <button onClick={onClose}>
              <LucidePanelRightClose />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
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
              <Button
                size="md"
                variant="line"
                onclickHandler={handleCloseChat}
                className="absolute bottom-[3rem] left-8 right-8 min-w-[100px] text-center">
                모임 나가기
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="모임 나가기"
        message="정말로 이 모임에서 나가시겠습니까?"
        confirmText="나가기"
        cancelText="취소"
        onConfirm={confirmCloseChat}
      />
    </>
  );
};
