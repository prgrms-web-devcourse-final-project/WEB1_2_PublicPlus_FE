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
  const queryKey = facilityId ? QUERY_KEYS.reviews.list(facilityId) : [];

  const {
    data: reviews,
    isLoading,
    isError
  } = useQuery({
    queryKey: queryKey,
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
    mutationFn: (params: {
      facilityId: string;
      reviewId: number;
      ReviewDTO: ReviewDTO;
    }) => {
      console.log('mutationFn params:', params);
      if (!facilityId) throw new Error('Facility ID is required');
      return reviewService.updateReview(
        params.facilityId,
        params.reviewId,
        params.ReviewDTO
      );
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
    isError,
    createReview: createMutation.mutate,
    updateReview: updateMutation.mutate,
    deleteReview: deleteMutation.mutate
  };
};
