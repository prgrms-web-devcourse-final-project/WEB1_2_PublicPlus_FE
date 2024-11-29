'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChatRoomCard } from '@/components/common/Cards/ChatRoomCard';
import { Toggle } from '@/components/common/Toggle';
import { ChatData } from './constants';
import { ChatRoom } from '../../types';

export default function ChatRoomList() {
  const [activeTab, setActiveTab] = useState<'group' | 'personal'>('group');
  const [isActiveChat, setIsActiveChat] = useState<boolean>(true);
  const [chatRooms] = useState<ChatRoom[]>(ChatData);

  const filteredChatRooms = chatRooms.filter(
    room =>
      room.type === activeTab &&
      room.status === (isActiveChat ? 'active' : 'completed')
  );

  return (
    <div className="flex h-screen flex-col">
      {/* 그룹 개인 탭 */}
      <div className="mb-8 flex">
        <button
          className={`flex-1 p-3 ${activeTab === 'group' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('group')}>
          그룹 채팅
        </button>
        <button
          className={`flex-1 p-3 ${activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('personal')}>
          개인 채팅
        </button>
      </div>

      {/* 진행중/종료된 채팅 토글 */}
      <div className="flex items-center justify-between py-2">
        <span
          className={`mb-2 mr-4 text-sm ${isActiveChat ? 'font-semibold' : 'text-gray-800'}`}>
          {isActiveChat ? '진행중 채팅' : '종료된 채팅'}
        </span>
        <div className="w-20">
          <Toggle
            isOn={isActiveChat}
            onToggle={() => setIsActiveChat(!isActiveChat)}
          />
        </div>
      </div>

      {/* 채팅 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatRooms.length === 0 ? (
          <div className="flex min-h-[30vh] items-center justify-center text-gray-500">
            {activeTab === 'group'
              ? isActiveChat
                ? '진행중인 그룹 채팅이 없어요'
                : '종료된 그룹 채팅이 없어요'
              : isActiveChat
                ? '진행중인 개인 채팅이 없어요'
                : '종료된 개인 채팅이 없어요'}
          </div>
        ) : (
          filteredChatRooms.map(room => (
            <Link
              href={`/chat/${room.id}`}
              key={room.id}
              className="mb-4 block">
              <ChatRoomCard
                name={room.name}
                latestMessage={room.latestMessage}
                latestTimestamp={room.latestTimestamp}
                sports={room.sports}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
