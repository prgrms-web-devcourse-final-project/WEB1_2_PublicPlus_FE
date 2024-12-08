'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CustomHeader } from '@/widgets/Header/ui/CustomHeader';
import { ChatRoomInfoModal } from '@/features/chat/ui/ChatRoomInfoModal/ChatRoomInfoModal';
import { ChatRoom } from '@/features/chat/model/types';
import { ChatInput } from '@/features/chat/ui/components/ChatInput';
import { ChatMessage } from '@/features/chat/ui/components/ChatMessage';

interface Message {
  id: string;
  message: string;
  timestamp: string;
  isMine: boolean;
  username?: string;
  profileImage?: string;
}

const CHAT_ROOMS: ChatRoom[] = [
  {
    id: '1',
    name: '농구에 미친 사럼들',
    // latestMessage: '종합운동장에서 하는 거 맞나요??',
    latestTimestamp: '2024.11.28',
    type: 'group'
    // sports: '농구',
    // status: 'active',
    // messages: [
    //   {
    //     id: '1',
    //     message: '종합운동장 몇 시에 모일까요?',
    //     timestamp: '오후 2:30',
    //     isMine: false,
    //     username: '농구러',
    //     profileImage: ''
    //   },
    //   {
    //     id: '2',
    //     message: '오후 6시 종합운동장 농구장에서 만나요!',
    //     timestamp: '오후 2:35',
    //     isMine: true
    //   }
    // ]
  }
  // {
  //   id: '2',
  //   name: '김철수',
  //   latestMessage: '오늘 저녁 러닝 ㄱ?',
  //   latestTimestamp: '2024.11.28',
  //   type: 'personal',
  //   sports: '',
  //   status: 'completed',
  //   messages: [
  //     {
  //       id: '1',
  //       message: '오늘 저녁 러닝 ㄱ?',
  //       timestamp: '오후 2:31',
  //       isMine: false,
  //       username: '김철수',
  //       profileImage: ''
  //     },
  //     {
  //       id: '2',
  //       message: '네, 몇 시쯤 갈까요?',
  //       timestamp: '오후 2:32',
  //       isMine: true
  //     }
  //   ]
  // },
  // {
  //   id: '3',
  //   name: '축구 동호회',
  //   latestMessage: '다음 경기 일정 잡자',
  //   latestTimestamp: '2024.11.27',
  //   type: 'group',
  //   sports: '축구',
  //   status: 'active',
  //   messages: [
  //     {
  //       id: '1',
  //       message: '다음 경기 일정 언제로 할까요?',
  //       timestamp: '오후 3:00',
  //       isMine: false,
  //       username: '축구러',
  //       profileImage: ''
  //     },
  //     {
  //       id: '2',
  //       message: '다음 주 토요일 오후 2시 어떠세요?',
  //       timestamp: '오후 3:05',
  //       isMine: true
  //     }
  //   ]
  // },
  // {
  //   id: '4',
  //   name: '이영희',
  //   latestMessage: '테니스 레슨 끝났어',
  //   latestTimestamp: '2024.11.26',
  //   type: 'personal',
  //   sports: '',
  //   status: 'completed',
  //   messages: [
  //     {
  //       id: '1',
  //       message: '테니스 레슨 끝났어',
  //       timestamp: '오후 4:00',
  //       isMine: false,
  //       username: '이영희',
  //       profileImage: ''
  //     },
  //     {
  //       id: '2',
  //       message: '수고하셨어요!',
  //       timestamp: '오후 4:05',
  //       isMine: true
  //     }
  //   ]
  // }
];

export default function ChatRoomDetail() {
  const params = useParams();
  const chatRoomId = typeof params?.id === 'string' ? params.id : '';

  const [roomInfo, setRoomInfo] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);

  useEffect(() => {
    const selectedRoom = CHAT_ROOMS.find(room => room.id === chatRoomId);

    if (selectedRoom) {
      setRoomInfo(selectedRoom);
    }
  }, [chatRoomId]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      message: inputValue,
      timestamp: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      isMine: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const handleMoreClick = () => {
    setIsSideModalOpen(true);
  };

  if (!roomInfo) return <div>채팅방을 찾을 수 없습니다.</div>;

  return (
    <div className="flex h-[calc(100vh-14rem)] flex-col">
      <CustomHeader
        title={roomInfo.name}
        rightButton={{
          icon: '/icons/more_horiz.png',
          alt: '더보기',
          onClick: handleMoreClick
        }}
      />

      <div className="scrollbar-custom flex-1 overflow-y-auto rounded bg-[#EEF4FF] p-8">
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            timestamp={msg.timestamp}
            isMine={msg.isMine}
            username={msg.username}
            profileImage={msg.profileImage}
          />
        ))}
      </div>
      <div className="w-full">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
        />
      </div>

      {/* 사이드 모달 */}
      {isSideModalOpen && roomInfo && (
        <ChatRoomInfoModal
          roomInfo={roomInfo}
          onClose={() => setIsSideModalOpen(false)}
        />
      )}
    </div>
  );
}
