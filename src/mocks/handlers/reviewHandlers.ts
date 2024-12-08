import { ReviewDTO } from '@/shared/api/generated';
import { http, HttpResponse } from 'msw';
import { reviewDb } from '../db/reviewDb';

export const reviewHandlers = [
  // 시설별 리뷰 조회
  http.get('/api/facility-details/:facilityId/reviews', ({ params }) => {
    const { facilityId } = params;
    const reviews = reviewDb.getReviewsByFacilityId(facilityId as string);
    return HttpResponse.json(reviews);
  }),

  // 리뷰 생성
  http.post(
    '/api/facility-details/:facilityId/reviews',
    async ({ request, params }) => {
      const review = (await request.json()) as ReviewDTO;
      const { facilityId } = params;

      const newReview = reviewDb.createReview(facilityId as string, {
        content: review.content || '',
        rating: review.rating || 0,
        tags: review.tags || []
      });

      return HttpResponse.json(newReview);
    }
  ),

  // 리뷰 수정
  http.put(
    '/api/facility-details/:facilityId/reviews/:reviewId',
    async ({ request, params }) => {
      const updatedReview = (await request.json()) as ReviewDTO;
      const { facilityId, reviewId } = params;

      const result = reviewDb.updateReview(
        facilityId as string,
        Number(reviewId),
        updatedReview
      );

      if (!result) {
        return HttpResponse.json(
          { message: 'Review not found' },
          { status: 404 }
        );
      }

      return HttpResponse.json(result);
    }
  ),

  // 리뷰 삭제
  http.delete(
    '/api/facility-details/:facilityId/reviews/:reviewId',
    ({ params }) => {
      const { facilityId, reviewId } = params;

      const success = reviewDb.deleteReview(
        facilityId as string,
        Number(reviewId)
      );

      if (!success) {
        return HttpResponse.json(
          { message: 'Review not found' },
          { status: 404 }
        );
      }

      return HttpResponse.json({ message: 'Review deleted successfully' });
    }
  )
];
