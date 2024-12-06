'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMeetingBoardDetail } from '@/features/meeting/model/queries';
import { FullScreenLoading } from '@/components/common/Loading';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';
import { useAuthStore } from '@/entities/User/model/store/authStore';
import {
  MeetingComments,
  MeetingHeader,
  MeetingInfo,
  MeetingTabs
} from '@/features/meeting';

export default function MeetingDetail() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated: session } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'info' | 'comments'>('info');
  const id = params?.id as string;

  const {
    data: meeting,
    isLoading,
    error
  } = useMeetingBoardDetail(Number(id), {
    enabled: Boolean(id),
    retry: false,
    onError: () => {
      toast.error('모임 정보를 불러오는데 실패했습니다.');
    }
  });
  console.log('모임 상세 정보 데이터', meeting);

  // 모임 참여 상태 확인 (임시 로직)
  const isJoined = true;

  const handleParticipateClick = () => {
    if (!session) {
      // 로그인 필요 얼럿
      if (confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')) {
        router.push('/auth/signin');
      }
      return;
    }

    // 여기에 모임 참여 로직 구현
    // participateMutation.mutate(id);
  };

  const handleChatClick = () => {
    // 채팅방 입장 로직
    router.push(`/chat/meeting/${id}`);
  };

  if (!id) {
    return (
      <div className="p-4 text-center text-gray-500">잘못된 접근입니다.</div>
    );
  }

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <ErrorFallback message="모임 정보를 불러오는데 실패했습니다." />;
  }

  if (!meeting) {
    return (
      <div className="p-4 text-center text-gray-500">모임 정보가 없습니다.</div>
    );
  }

  return (
    <div className="flex flex-col">
      <MeetingHeader meeting={meeting} />

      {/* 참여한 경우에만 댓글 탭 표시 */}
      <MeetingTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showComments={isJoined}
      />

      {activeTab === 'info' && <MeetingInfo meeting={meeting} />}
      {activeTab === 'comments' && isJoined && (
        <MeetingComments meetingId={id} />
      )}

      {/* 하단 고정 버튼 */}
      <div className="sticky bottom-[80px] z-[90] mx-auto w-full max-w-[600px] bg-white px-6">
        {!session ? (
          <button
            onClick={handleParticipateClick}
            className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600">
            모임 참여하기
          </button>
        ) : !isJoined ? (
          <button
            onClick={handleParticipateClick}
            className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600">
            모임 참여하기
          </button>
        ) : (
          <button
            onClick={handleChatClick}
            className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600">
            채팅 참여하기
          </button>
        )}
      </div>
    </div>
  );
}
