'use client';
import { useState } from 'react';
import { ChatMessage } from '@/components/common/Chat/ChatMessage';
import { ChatInput } from '@/components/common/Chat/ChatInput';
import { CustomHeader } from '@/components/common/Header/CustomHeader';

interface Message {
  id: string;
  message: string;
  timestamp: string;
  isMine: boolean;
  username?: string;
  profileImage?: string;
}

export default function ChatRoom() {
  // 채팅방 정보 상태 추가
  const [roomInfo] = useState({
    name: '테니스합시덩',
    lastMessage: '안녕하세요~~~',
    timestamp: '오후 11:35'
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: '안녕하세요! 테니스 모임에 대해 문의드립니다.',
      timestamp: '오후 2:30',
      isMine: false,
      username: '사용자',
      profileImage: '/jjang.jpeg'
    },
    {
      id: '2',
      message: '네, 어떤 점이 궁금하신가요?',
      timestamp: '오후 2:31',
      isMine: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');

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
    // 더보기 버튼 클릭 시 실행할 함수
    console.log('더보기 버튼 클릭');
    // 여기에 원하는 로직 추가
  };

  return (
    <div className="flex h-[calc(100vh-13rem)] flex-col">
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
    </div>
  );
}
