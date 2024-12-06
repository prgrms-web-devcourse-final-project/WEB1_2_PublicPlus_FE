import { api } from '@/shared/api/client';
import type { ReviewDTO } from '@/api/generated';

export const reviewService = {
  // 시설별 리뷰 조회
  getReviewsByFacility: async (facilityId: string) => {
    console.log('요청하는 facilityId:', facilityId);
    try {
      const response =
        await api.reviewClient.apiFacilityDetailFacilityIdReviewsGet(
          facilityId
        );
      console.log('API 응답 데이터:', response.data); // 응답 데이터 구조 확인
      return response.data;
    } catch (error) {
      console.error('API 에러:', error);
      // console.log('요청 URL:', error?.config?.url); // 실제 요청된 URL 확인
      throw error;
    }
  },

  // 리뷰 생성
  createReview: async (facilityId: string, review: ReviewDTO) => {
    console.log('리뷰 생성 API 요청 데이터: ', facilityId, review);
    try {
      const response =
        await api.reviewClient.apiFacilityDetailFacilityIdReviewsPost(
          facilityId,
          review
        );
      console.log('리뷰 생성 API 응답 데이터:', response.data); // 응답 데이터 구조 확인
      return response.data;
    } catch (error) {
      console.error('API 에러:', error);
      // console.log('요청 URL:', error?.config?.url); // 실제 요청된 URL 확인
      throw error;
    }
  },

  // 리뷰 수정
  updateReview: async (
    facilityId: string,
    reviewId: number,
    reviewDTO: ReviewDTO
  ) => {
    console.log(
      '요청하는 facilityId, reviewId, 수정 데이터 review:',
      facilityId,
      typeof reviewId,
      reviewId,
      reviewDTO
    );
    try {
      const response =
        await api.reviewClient.apiFacilityDetailFacilityIdReviewsReviewIdPut(
          facilityId,
          reviewId,
          reviewDTO
        );
      return response.data;
    } catch (error) {
      console.error('API 에러:', error);
      // console.log('요청 URL:', error?.config?.url); // 실제 요청된 URL 확인
      throw error;
    }
  },

  // 리뷰 삭제
  deleteReview: async (facilityId: string, reviewId: number) => {
    const response =
      await api.reviewClient.apiFacilityDetailFacilityIdReviewsReviewIdDelete(
        facilityId,
        reviewId
      );
    return response.data;
  }
};
