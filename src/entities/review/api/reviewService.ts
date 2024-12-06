import { api } from '@/shared/api/client';
import type { ReviewDTO } from '@/api/generated';

export const reviewService = {
  // 시설별 리뷰 조회
  getReviewsByFacility: async (facilityId: string) => {
    const response = await api.reviewClient.getReviewsByFacility(facilityId);
    return response.data;
  },

  // 리뷰 생성
  createReview: async (facilityId: string, review: ReviewDTO) => {
    const response = await api.reviewClient.createReview(facilityId, review);
    return response.data;
  },

  // 리뷰 수정
  updateReview: async (
    facilityId: string,
    reviewId: number,
    review: ReviewDTO
  ) => {
    const response = await api.reviewClient.updateReview(
      facilityId,
      reviewId,
      review
    );
    return response.data;
  },

  // 리뷰 삭제
  deleteReview: async (facilityId: string, reviewId: number) => {
    const response = await api.reviewClient.deleteReview(facilityId, reviewId);
    return response.data;
  }
};
