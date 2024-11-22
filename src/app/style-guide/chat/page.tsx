// app/chat/page.tsx
'use client';
import { ChatInput } from '@/components/common/ChatInput';
import { ChatMessage } from '@/components/common/ChatMessage';
import { useState } from 'react';

export default function ChatPage() {
  // 메시지 상태 관리
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: '안녕하세요! 테니스 모임에 대해 문의드립니다.',
      timestamp: '오후 2:30',
      isMine: false
    },
    {
      id: 2,
      message: '네, 어떤 점이 궁금하신가요?',
      timestamp: '오후 2:31',
      isMine: true
    }
  ]);

  // 메시지 입력 상태 관리
  const [inputMessage, setInputMessage] = useState('');

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: inputMessage,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isMine: true
      };

      // 새 메시지 추가
      setMessages([...messages, newMessage]);

      // 입력창 초기화
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            timestamp={msg.timestamp}
            isMine={msg.isMine}
          />
        ))}
      </div>

      {/* 채팅 입력 컴포넌트 */}
      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
}
