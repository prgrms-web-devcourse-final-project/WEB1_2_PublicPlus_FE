'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChatRoomCard } from '@/components/common/Cards/ChatRoomCard';

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
}

export default function ChatRoomList() {
  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      name: '채팅방 1',
      lastMessage: '안녕하세요',
      timestamp: '2024.11.28'
    }
  ]);

  return (
    <div className="flex h-screen flex-col">
      <header className="mb-8">
        <h1 className="text-xl font-bold">채팅</h1>
      </header>
      <div className="flex-1 overflow-y-auto">
        {chatRooms.map(room => (
          <Link
            href={`/chat/${room.id}`}
            key={room.id}
            className="mb-4 block">
            <ChatRoomCard
              name={room.name}
              lastMessage={room.lastMessage}
              timestamp={room.timestamp}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
