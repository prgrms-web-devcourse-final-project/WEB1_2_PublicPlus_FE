import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { likeService } from '@/entities/facility/Like/api/likeService';

// Query Key 정의
export const QUERY_KEYS = {
  like: {
    all: ['like'],
    detail: (facilityId: string) => ['like', facilityId] // 좋아요를 특정 시설에 대한 것으로
  }
};

// 좋아요 추가
export const useAddLike = (
  tokens: string
): UseMutationResult<string, Error, string> => {
  return useMutation({
    mutationFn: (facilityId: string) =>
      likeService.addLikeService(facilityId, tokens),
    onError: error => {
      console.error('Failed to add like:', error);
      alert('좋아요 추가에 실패했습니다. 다시 시도해주세요.');
    }
  });
};

// 좋아요 취소
export const useRemoveLike = (
  tokens: string
): UseMutationResult<string, Error, string> => {
  return useMutation({
    mutationFn: (facilityId: string) =>
      likeService.removeLikeService(facilityId, tokens),
    onError: error => {
      console.error('Failed to remove like:', error);
      alert('좋아요 취소에 실패했습니다. 다시 시도해주세요.');
    }
  });
};
