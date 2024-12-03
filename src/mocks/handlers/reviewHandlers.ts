import { ReviewDTO } from '@/api/generated';
import { http, HttpResponse } from 'msw';
import { reviewDb } from '../db/reviewDb';

export const reviewHandlers = [
  // 시설별 리뷰 조회
  http.get('/api/facility-details/:facilityId/reviews', ({ params }) => {
    const { facilityId } = params;
    const reviews = reviewDb.getReviewsByFacilityId(String(facilityId));
    return HttpResponse.json(reviews);
  }),

  // 리뷰 생성
  http.post(
    '/api/facility-details/:facilityId/reviews',
    async ({ params, request }) => {
      const { facilityId } = params;
      const reviewData = (await request.json()) as Omit<
        ReviewDTO,
        'id' | 'likes' | 'views'
      >;
      const newReview = reviewDb.createReview(String(facilityId), reviewData);
      return HttpResponse.json(newReview, { status: 201 });
    }
  ),

  // 리뷰 수정
  http.put(
    '/api/facility-details/:facilityId/reviews/:reviewId',
    async ({ params, request }) => {
      const { facilityId, reviewId } = params;
      const data = (await request.json()) as Partial<ReviewDTO>;
      const updatedReview = reviewDb.updateReview(
        String(facilityId),
        Number(reviewId),
        data
      );

      if (!updatedReview) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(updatedReview);
    }
  ),

  // 리뷰 삭제
  http.delete(
    '/api/facility-details/:facilityId/reviews/:reviewId',
    ({ params }) => {
      const { facilityId, reviewId } = params;
      const success = reviewDb.deleteReview(
        String(facilityId),
        Number(reviewId)
      );

      if (!success) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json({ message: 'Review deleted successfully' });
    }
  )
];
