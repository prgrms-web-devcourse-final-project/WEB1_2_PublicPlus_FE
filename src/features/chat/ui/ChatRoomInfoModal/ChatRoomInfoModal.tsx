'use client';
import { useState } from 'react';
import { LucidePanelRightClose } from 'lucide-react';
import { Button } from '@/shared/ui/components/button/Button';
import { ChatRoomDetailInfo } from './ChatRoomDetailInfo';
import { SideModalProps } from '../../model/types';
import { Modal } from '@/shared/ui/components/Modal/Modal';

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
            <ChatRoomDetailInfo roomInfo={roomInfo} />
            <Button
              size="md"
              variant="line"
              onClick={handleCloseChat}
              className="absolute bottom-[3rem] left-8 right-8 min-w-[100px] text-center">
              모임 나가기
            </Button>
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
