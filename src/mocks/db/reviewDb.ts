import { ReviewDTO } from '@/shared/api/generated';
import { reviewData } from '../data/reviewData';

interface Review {
  id: number;
  content: string;
  rating: number;
  tags: string[];
  likes: number;
  views: number;
}

class ReviewDatabase {
  private reviewData = reviewData;
  private lastId = 3;

  getReviewsByFacilityId(facilityId: string) {
    const facilityReviews = this.reviewData.find(
      f => f.facilityId === facilityId
    );
    return facilityReviews?.reviews || [];
  }

  createReview(
    facilityId: string,
    review: Omit<ReviewDTO, 'id' | 'likes' | 'views'>
  ) {
    const facility = this.reviewData.find(f => f.facilityId === facilityId);

    // 필수 필드에 기본값 설정
    const newReview: Review = {
      ...review,
      id: ++this.lastId,
      content: review.content || '',
      rating: review.rating || 0,
      tags: review.tags || [],
      likes: 0,
      views: 0
    };

    if (facility) {
      facility.reviews.push(newReview);
    } else {
      this.reviewData.push({
        facilityId,
        reviews: [newReview]
      });
    }

    return newReview;
  }

  updateReview(facilityId: string, reviewId: number, data: Partial<ReviewDTO>) {
    const facility = this.reviewData.find(f => f.facilityId === facilityId);
    if (!facility) return null;

    const reviewIndex = facility.reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) return null;

    const updatedReview: Review = {
      ...facility.reviews[reviewIndex],
      content: data.content || facility.reviews[reviewIndex].content,
      rating: data.rating ?? facility.reviews[reviewIndex].rating,
      tags: data.tags || facility.reviews[reviewIndex].tags
    };

    facility.reviews[reviewIndex] = updatedReview;

    return updatedReview;
  }

  deleteReview(facilityId: string, reviewId: number) {
    const facility = this.reviewData.find(f => f.facilityId === facilityId);
    if (!facility) return false;

    const initialLength = facility.reviews.length;
    facility.reviews = facility.reviews.filter(r => r.id !== reviewId);

    return facility.reviews.length !== initialLength;
  }
}

export const reviewDb = new ReviewDatabase();
