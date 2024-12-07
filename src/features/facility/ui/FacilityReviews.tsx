import { useRouter } from 'next/navigation';
import { FacilityDetailsResponseDTO, ReviewDTO } from '@/shared/api/generated';
import { Card } from '@/components/common/Cards/Card';
import { Button } from '@/shared/ui/components/button/Button';
import { useReviews } from '@/features/review/model/queries';
import { ReviewForm } from '@/features/review/ui/ReviewForm';
import { Rating } from '@/widgets/rating/Rating';
import { useReviewStore } from '@/features/review/model/store';
import { useAuthStore } from '@/entities/User';

interface FacilityReviewsProps {
  facility: FacilityDetailsResponseDTO;
}

export const FacilityReviews = ({ facility }: FacilityReviewsProps) => {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuthStore();

  const { isWriting, editingId, setIsWriting, setEditingId } = useReviewStore();

  // Hook은 항상 최상위에서 호출
  const { reviews, createReview, updateReview, deleteReview } = useReviews(
    facility.facilityId
  );
  console.log('리뷰 데이터:', reviews?.internalReviews);

  // 데이터가 없을 때 처리
  if (!reviews?.internalReviews) return <div>로딩 중...</div>;

  // reviews가 배열이 아닐 경우 처리
  const reviewsArray = Array.isArray(reviews.internalReviews)
    ? reviews.internalReviews
    : [];

  const handleWriteClick = () => {
    if (!isAuthenticated) {
      if (
        window.confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')
      ) {
        router.push('/login');
      }
      return;
    }
    setIsWriting(true);
  };

  const handleCreate = (reviewData: ReviewDTO) => {
    createReview({
      ...reviewData
    });
    setIsWriting(false);
  };

  const handleUpdate = (
    facilityId: string,
    reviewData: ReviewDTO,
    reviewId: number
  ) => {
    console.log('handleUpdate params:', { facilityId, reviewId, reviewData });

    updateReview({
      facilityId,
      ReviewDTO: reviewData,
      reviewId
    });
    setEditingId(null);
  };

  const handleDelete = (reviewId: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      deleteReview(reviewId);
    }
  };

  return (
    <div className="space-y-4 p-4 pb-20">
      {!isWriting && (
        <Button
          onClick={handleWriteClick}
          className="w-full">
          리뷰 작성하기
        </Button>
      )}

      {isWriting && (
        <Card className="p-4">
          <ReviewForm
            onSubmit={handleCreate}
            onCancel={() => setIsWriting(false)}
          />
        </Card>
      )}

      {reviewsArray?.map(review => (
        <div
          key={review.reviewId}
          className="space-y-2">
          {editingId === review.reviewId ? (
            <Card className="p-4">
              <ReviewForm
                initialData={review}
                onSubmit={updatedReview =>
                  handleUpdate(
                    facility.facilityId!,
                    updatedReview,
                    review.reviewId
                  )
                }
                onCancel={() => setEditingId(null)}
              />
            </Card>
          ) : (
            <Card
              key={review.reviewId}
              className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Rating
                      value={review.rating}
                      readOnly
                    />
                    <p className="text-sm text-gray-600">{review.content}</p>
                  </div>
                  {userId && (
                    <div className="flex gap-2">
                      <Button
                        variant="line"
                        size="sm"
                        onClick={() => {
                          setEditingId(review.reviewId!);
                        }}>
                        수정
                      </Button>
                      <Button
                        variant="gray"
                        size="sm"
                        onClick={() => {
                          handleDelete(review.reviewId!);
                        }}>
                        삭제
                      </Button>
                    </div>
                  )}
                </div>
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {review.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};
