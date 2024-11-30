import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReviewDTO } from '@/api/generated';
import { reviewService } from '@/entities/review/api/reviewService';

// Query Key 정의
export const QUERY_KEYS = {
  reviews: {
    all: ['reviews'] as const,
    list: (facilityId: string) =>
      [...QUERY_KEYS.reviews.all, facilityId] as const
  }
} as const;

export const useReviews = (facilityId: string | undefined) => {
  const queryClient = useQueryClient();
  const queryKey = facilityId ? QUERY_KEYS.reviews.list(facilityId) : null;

  const {
    data: reviews,
    isLoading,
    isError
  } = useQuery({
    queryKey: queryKey ? queryKey : [],
    queryFn: () => {
      if (!facilityId) throw new Error('Facility ID is required');
      return reviewService.getReviewsByFacility(facilityId);
    },
    enabled: Boolean(facilityId) // facilityId가 존재할 때만 쿼리 활성화
  });

  const createMutation = useMutation({
    mutationFn: (review: ReviewDTO) => {
      if (!facilityId) throw new Error('Facility ID is required');
      return reviewService.createReview(facilityId, review);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const updateMutation = useMutation({
    mutationFn: ({
      reviewId,
      review
    }: {
      reviewId: number;
      review: ReviewDTO;
    }) => {
      if (!facilityId) throw new Error('Facility ID is required');
      return reviewService.updateReview(facilityId, reviewId, review);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: number) => {
      if (!facilityId) throw new Error('Facility ID is required');
      return reviewService.deleteReview(facilityId, reviewId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  return {
    reviews,
    isLoading,
    isError, // 오류 상태 추가
    createReview: createMutation.mutate,
    updateReview: updateMutation.mutate,
    deleteReview: deleteMutation.mutate
  };
};
