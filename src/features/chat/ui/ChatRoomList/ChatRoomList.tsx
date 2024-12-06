'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toggle } from '@/components/common/Toggle';
import { ChatRoom } from '../../types';

interface BackendChatRoom {
  chatRoomId: number;
  chatRoomName: string;
  chatRoomType: string;
  createdAt: string;
}

export default function ChatRoomList() {
  const [activeTab, setActiveTab] = useState<'group' | 'personal'>('group');
  const [isActiveChat, setIsActiveChat] = useState<boolean>(true);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChatRooms = async () => {
    try {
      setIsLoading(true);
      const accessToken = Cookies.get('accessToken');

      const response = await axios.get<BackendChatRoom[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatroom`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const formattedChatRooms: ChatRoom[] = response.data.map(
        (room: BackendChatRoom) => ({
          id: room.chatRoomId.toString(),
          name: room.chatRoomName,
          type: room.chatRoomType.toLowerCase() as 'group' | 'personal',
          latestTimestamp: room.createdAt
        })
      );

      setChatRooms(formattedChatRooms);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchChatRooms();
  }, []);

  const filteredChatRooms = chatRooms.filter(room => room.type === activeTab);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

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
              {/* <ChatRoomCard
                name={room.name}
                latestTimestamp={room.latestTimestamp}
              /> */}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
