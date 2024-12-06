'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function NewChatRoom() {
  const router = useRouter();
  const [chatRoomName, setChatRoomName] = useState<string>('');
  const [chatRoomType, setChatRoomType] = useState<'GROUP' | 'PERSONAL'>(
    'GROUP'
  );
  const [maxParticipants, setMaxParticipants] = useState<number>(3);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 쿠키에서 토큰 추출
    const authStorageCookie = Cookies.get('auth-storage');

    if (authStorageCookie) {
      try {
        const parsedCookie = JSON.parse(authStorageCookie);
        const token = parsedCookie.state.tokens.access_token;
        setAccessToken(token);
      } catch (error) {
        console.error('토큰 파싱 중 오류:', error);
        alert('인증 정보를 읽는 데 실패했습니다.');
      }
    }
  }, []);
  const handleCreateChatRoom = async () => {
    try {
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatroom`,
        {
          chatRoomName,
          chatRoomType,
          maxParticipants
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // 채팅방 생성 성공 시 해당 채팅방으로 이동
      if (response.status === 200) {
        const newChatRoom = response.data;
        router.push(`/chat/${newChatRoom.chatRoomId}`);
      }
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error);
      alert('채팅방 생성에 실패했습니다.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">새 채팅방 생성</h1>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block">채팅방 이름</label>
          <input
            type="text"
            value={chatRoomName}
            onChange={e => setChatRoomName(e.target.value)}
            placeholder="채팅방 이름을 입력하세요"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">채팅방 유형</label>
          <select
            value={chatRoomType}
            onChange={e =>
              setChatRoomType(e.target.value as 'GROUP' | 'PERSONAL')
            }
            className="w-full rounded border p-2">
            <option value="GROUP">그룹 채팅</option>
            <option value="PERSONAL">개인 채팅</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">최대 참여 인원</label>
          <input
            type="number"
            value={maxParticipants}
            onChange={e => setMaxParticipants(Number(e.target.value))}
            min={2}
            max={10}
            className="w-full rounded border p-2"
          />
        </div>

        <button
          onClick={handleCreateChatRoom}
          disabled={!chatRoomName}
          className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600 disabled:bg-gray-300">
          채팅방 생성
        </button>
      </div>
    </div>
  );
}
