'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { MeetingBoardRequestDTO } from '@/api/generated';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCreateMeetingBoard,
  QUERY_KEYS
} from '@/features/meeting/model/queries';
import { CreateMeetingForm } from '@/features/meeting/ui/CreateMeetingForm';

export default function MeetingBoardCreation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingData, setPendingData] = useState<MeetingBoardRequestDTO | null>(
    null
  );
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const { mutateAsync, isPending, error } = useCreateMeetingBoard();

  // 토스트 메시지 표시 함수
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleCreateMeeting = async (data: MeetingBoardRequestDTO) => {
    setPendingData(data);
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    if (!pendingData) return;

    try {
      await mutateAsync(pendingData);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.meetingBoard.list()
      });

      showToast('모임이 성공적으로 생성되었습니다!', 'success');
      setTimeout(() => {
        router.push('/meeting');
      }, 1000);
    } catch (err) {
      showToast('모임 생성 중 오류가 발생했습니다.', 'error');
      console.error('Meeting creation error:', err);
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container relative mx-auto px-4 py-6">
        {/* 로딩 오버레이 */}
        {isPending && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-6">
              <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-center">처리 중...</p>
            </div>
          </div>
        )}

        {/* 토스트 메시지 */}
        {toast.show && (
          <div
            className={`fixed right-4 top-4 z-50 rounded-lg p-4 shadow-lg transition-opacity duration-300 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}>
            {toast.message}
          </div>
        )}

        {/* 확인 다이얼로그 */}
        {showDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="max-w-md rounded-lg bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold">모임 생성 확인</h3>
              <p className="mb-4 text-gray-600">
                입력하신 내용으로 모임을 생성하시겠습니까? 생성 후에는 일부
                정보만 수정이 가능합니다.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDialog(false)}
                  className="rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300">
                  취소
                </button>
                <button
                  onClick={handleConfirm}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                  생성하기
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error.message}
          </div>
        )}

        <CreateMeetingForm
          onSubmit={handleCreateMeeting}
          isLoading={isPending}
        />
      </div>
    </main>
  );
}
