import { useRouter } from 'next/navigation';
import { FacilityDetailsResponseDTO, ReviewDTO } from '@/api/generated';
import { Card } from '@/components/common/Cards/Card';
import { Button } from '@/components/common/Button/Button';
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

  if (!facility.facilityId) {
    return <div>시설 정보를 찾을 수 없습니다.</div>;
  }

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
      ...reviewData,
      id: undefined, // 새로운 리뷰이므로 id는 서버에서 생성
      views: 0,
      likes: 0
    });
    setIsWriting(false);
  };

  const handleUpdate = (reviewId: number, reviewData: ReviewDTO) => {
    updateReview({
      reviewId,
      review: {
        ...reviewData,
        id: reviewId
      }
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
          onclickHandler={handleWriteClick}
          className="w-full">
          리뷰 작성하기
        </Button>
      )}

      {isWriting && (
        <Card className="p-4">
          <ReviewForm
            facilityId={facility.facilityId!}
            onSubmit={handleCreate}
            onCancel={() => setIsWriting(false)}
          />
        </Card>
      )}

      {reviews?.map(review => (
        <div
          key={review.id}
          className="space-y-2">
          {editingId === review.id ? (
            <Card className="p-4">
              <ReviewForm
                facilityId={facility.facilityId!}
                initialData={review}
                onSubmit={updatedReview =>
                  handleUpdate(review.id!, updatedReview)
                }
                onCancel={() => setEditingId(null)}
              />
            </Card>
          ) : (
            <Card
              key={review.id}
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
                        onclickHandler={e => {
                          e.stopPropagation();
                          setEditingId(review.id!);
                        }}>
                        수정
                      </Button>
                      <Button
                        variant="gray"
                        size="sm"
                        onclickHandler={e => {
                          e.stopPropagation();
                          handleDelete(review.id!);
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
