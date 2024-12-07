import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationResult
} from '@tanstack/react-query';
import { MeetingBoardRequestDTO } from '@/api/generated';
import { meetingBoardService } from '@/entities/meetingBoard/api/meetingBoardService';

// Query Key 정의
export const QUERY_KEYS = {
  meetingBoard: {
    all: ['meetingBoard'],
    detail: (mbId: number) => ['meetingBoard', mbId],
    list: () => ['meetingBoard', 'list'] // 함수를 반환하도록 수정
  }
};

// 모임 목록 조회
export const useMeetingBoards = (
  options?: Omit<
    UseQueryOptions<
      object,
      Error,
      object,
      ReturnType<typeof QUERY_KEYS.meetingBoard.list>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<
    object,
    Error,
    object,
    ReturnType<typeof QUERY_KEYS.meetingBoard.list>
  >({
    queryKey: QUERY_KEYS.meetingBoard.list(),
    queryFn: meetingBoardService.getAllMeetingBoards,
    ...options
  });
};

// 모임 상세 조회
export const useMeetingBoardDetail = (
  mbId: number,
  options?: Omit<
    UseQueryOptions<
      object,
      Error,
      object,
      ReturnType<typeof QUERY_KEYS.meetingBoard.detail>
    >,
    'queryKey' | 'queryFn'
  > & {
    onError?: (error: Error) => void;
  }
) => {
  return useQuery<
    object,
    Error,
    object,
    ReturnType<typeof QUERY_KEYS.meetingBoard.detail>
  >({
    queryKey: QUERY_KEYS.meetingBoard.detail(mbId),
    queryFn: () => meetingBoardService.getMeetingBoardById(mbId),
    ...options
  });
};

// 모임 생성// 모임 생성 훅
export const useCreateMeetingBoard = (
  tokens: string
): UseMutationResult<
  void, // 성공 결과 타입
  Error, // 오류 타입
  MeetingBoardRequestDTO // 입력 데이터 타입
> => {
  return useMutation({
    mutationFn: meetingBoardData =>
      meetingBoardService.createMeetingBoard(meetingBoardData, tokens)
  });
};

// 모임 업데이트
export const useUpdateMeetingBoard = (mbId: number) => {
  return useMutation<void, Error, MeetingBoardRequestDTO>({
    mutationFn: meetingBoardData =>
      meetingBoardService.updateMeetingBoard(mbId, meetingBoardData)
  });
};

// 모임 삭제
export const useDeleteMeetingBoard = () => {
  return useMutation<void, Error, number>({
    mutationFn: meetingBoardService.deleteMeetingBoard
  });
};
