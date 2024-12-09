import { useRouter } from 'next/navigation';
import { FacilityDetailsResponseDTO, ReviewDTO } from '@/shared/api/generated';
import { Card } from '@/shared/ui/components/card/Card';
import { Button } from '@/shared/ui/components/button/Button';
import { useReviews } from '@/features/review/model/queries';
import { ReviewForm } from '@/features/review/ui/ReviewForm';
import { useReviewStore } from '@/features/review/model/store';
import { Rating } from '@/shared/ui/components/rating/Rating';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/entities/User';
import { Edit2, Trash2, MessageSquarePlus } from 'lucide-react';

interface FacilityReviewsProps {
  facility: FacilityDetailsResponseDTO;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: ReviewDTO) => void;
  initialData?: ReviewDTO;
}

const ReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: ReviewModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{ margin: 0 }}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        style={{ margin: 0 }}
        ref={modalRef}
        className="fixed left-1/2 top-1/2 z-[100] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
        <ReviewForm
          onSubmit={reviewData => {
            onSubmit(reviewData);
            onClose();
          }}
          onCancel={onClose}
          initialData={initialData}
        />
      </div>
    </>
  );
};

export const FacilityReviews = ({ facility }: FacilityReviewsProps) => {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuthStore();
  const { isWriting, editingId, setIsWriting, setEditingId } = useReviewStore();

  const { reviews, createReview, updateReview, deleteReview } = useReviews(
    facility.facilityId
  );

  if (!reviews?.internalReviews)
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="animate-pulse text-gray-500">리뷰를 불러오는 중...</div>
      </div>
    );

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
    <div className="space-y-6 p-4 pb-20 pt-10">
      <Button
        onClick={handleWriteClick}
        variant="line">
        <div className="flex items-center justify-center gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          <span>리뷰 작성하기</span>
        </div>
      </Button>

      <ReviewModal
        isOpen={isWriting}
        onClose={() => setIsWriting(false)}
        onSubmit={handleCreate}
      />

      {reviewsArray.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 text-gray-500">
          <p>아직 작성된 리뷰가 없습니다</p>
          <p className="text-sm">첫 번째 리뷰를 작성해보세요!</p>
        </div>
      ) : (
        reviewsArray?.map(review => (
          <div
            key={review.reviewId}
            className="space-y-2">
            <ReviewModal
              isOpen={editingId === review.reviewId}
              onClose={() => setEditingId(null)}
              onSubmit={updatedReview =>
                handleUpdate(
                  facility.facilityId!,
                  updatedReview,
                  review.reviewId
                )
              }
              initialData={review}
            />

            <Card className="group overflow-hidden p-4 transition-all hover:shadow-md">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Rating
                      value={review.rating}
                      readOnly
                      className="text-yellow-400"
                    />
                    <p className="text-sm leading-relaxed text-gray-700">
                      {review.content}
                    </p>
                  </div>
                  {userId && (
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="line"
                        size="sm"
                        onClick={() => setEditingId(review.reviewId!)}
                        className="flex items-center gap-1">
                        <Edit2 className="h-4 w-4" />
                        수정
                      </Button>
                      <Button
                        variant="gray"
                        size="sm"
                        onClick={() => handleDelete(review.reviewId!)}
                        className="flex items-center gap-1 text-red-500 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                        삭제
                      </Button>
                    </div>
                  )}
                </div>
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {review.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};
