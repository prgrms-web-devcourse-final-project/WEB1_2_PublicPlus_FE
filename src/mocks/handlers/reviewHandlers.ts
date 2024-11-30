import { ReviewDTO } from '@/api/generated';
import { http, HttpResponse } from 'msw';
import { reviewData } from '../data/reviewData';

export const reviewHandlers = [
  // 시설별 리뷰 조회
  http.get('/api/facility-details/:facilityId/reviews', ({ params }) => {
    const { facilityId } = params;

    // 특정 facilityId에 대한 리뷰 찾기
    const facilityData = reviewData.find(
      data => data.facilityId === facilityId
    );

    if (!facilityData) {
      // 데이터가 없는 경우 빈 배열 반환
      return HttpResponse.json([]);
    }

    // 데이터가 있는 경우 해당 리뷰 반환
    return HttpResponse.json(facilityData.reviews);
  }),

  // 리뷰 생성
  http.post(
    '/api/facility-details/:facilityId/reviews',
    async ({ request, params }) => {
      const review = (await request.json()) as ReviewDTO;
      const { facilityId } = params;

      const newReview = {
        ...review,
        id: Math.floor(Math.random() * 1000), // 랜덤 ID 생성
        likes: 0,
        views: 0,
        content: review.content || '', // content가 없으면 빈 문자열로 설정
        rating: review.rating || 0, // rating이 없으면 0으로 설정
        tags: review.tags || [] // tags가 없으면 빈 배열로 설정
      };

      // 해당 facilityId의 리뷰 목록에 새로운 리뷰 추가
      const facilityData = reviewData.find(
        data => data.facilityId === facilityId
      );
      if (facilityData) {
        facilityData.reviews.push(newReview);
      }

      return HttpResponse.json(newReview);
    }
  ),

  // 리뷰 수정
  http.put(
    '/api/facility-details/:facilityId/reviews/:reviewId',
    async ({ request, params }) => {
      const updatedReview = (await request.json()) as ReviewDTO;
      const { facilityId, reviewId } = params;

      const facilityData = reviewData.find(
        data => data.facilityId === facilityId
      );
      if (!facilityData) {
        return HttpResponse.json(
          { message: 'Facility not found' },
          { status: 404 }
        );
      }

      const reviewIndex = facilityData.reviews.findIndex(
        review => review.id === Number(reviewId)
      );
      if (reviewIndex === -1) {
        return HttpResponse.json(
          { message: 'Review not found' },
          { status: 404 }
        );
      }

      // 리뷰 수정
      facilityData.reviews[reviewIndex] = {
        ...facilityData.reviews[reviewIndex],
        ...updatedReview
      };

      return HttpResponse.json(facilityData.reviews[reviewIndex]);
    }
  ),

  // 리뷰 삭제
  http.delete(
    '/api/facility-details/:facilityId/reviews/:reviewId',
    ({ params }) => {
      const { facilityId, reviewId } = params;

      const facilityData = reviewData.find(
        data => data.facilityId === facilityId
      );
      if (!facilityData) {
        return HttpResponse.json(
          { message: 'Facility not found' },
          { status: 404 }
        );
      }

      const reviewIndex = facilityData.reviews.findIndex(
        review => review.id === Number(reviewId)
      );
      if (reviewIndex === -1) {
        return HttpResponse.json(
          { message: 'Review not found' },
          { status: 404 }
        );
      }

      // 리뷰 삭제
      facilityData.reviews.splice(reviewIndex, 1);

      return HttpResponse.json({ message: 'Review deleted successfully' });
    }
  )
];
