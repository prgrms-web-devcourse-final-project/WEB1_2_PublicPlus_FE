import { useState } from 'react';
import { ReviewDTO } from '@/shared/api/generated';
import { Button } from '@/shared/ui/components/Button/Button';
import { Rating } from '@/shared/ui/components/Rating/Rating';

const AVAILABLE_TAGS = [
  '깨끗함', '넓음', '무료 이용', '카페 운영', '편리한 위치', '예약이 쉬움',
  '단체예약 가능', '최신 장비 구비', '장비대여 가능', '주차 가능', '취식 가능', 
  '샤워 시설 구비', '아이 돌봄 서비스', '강습 프로그램 운영', '행사 운영',
  '휠체어 접근 가능', '안전한 환경', '탈의실 구비', '반려동물 동반 가능',
  '와이파이 무료', '24시간 운영', '역과 가까움'
] as const;

interface ReviewFormProps {
  onSubmit: (review: ReviewDTO) => void;
  initialData?: ReviewDTO;
  onCancel?: () => void;
}

export const ReviewForm = ({
  onSubmit,
  initialData,
  onCancel
}: ReviewFormProps) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      rating,
      tags
    });
  };

  const handleTagClick = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else if (tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">리뷰 작성하기</h2>
          <p className="text-gray-600">이용하신 시설은 어떠셨나요?</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <label className="text-gray-700 font-medium">별점을 선택해주세요</label>
          <Rating
            value={rating}
            onChange={setRating}
            className="text-2xl"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">리뷰 내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="시설 이용 경험을 자세히 들려주세요"
            className="min-h-[150px] w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">태그 선택</label>
            <span className="text-sm text-gray-500">
              {tags.length}/5개 선택됨
            </span>
          </div>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
            {AVAILABLE_TAGS.map(tag => (
              <Button
                key={tag}
                type="button"
                variant={tags.includes(tag) ? "primary" : "line"}
                onClick={() => handleTagClick(tag)}
                className={`!px-4 !py-2 text-sm rounded-full transition-all ${
                  tags.includes(tag) 
                    ? "bg-blue-500 text-white hover:bg-blue-600" 
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        {onCancel && (
          <Button
            type="button"
            variant="line"
            onClick={onCancel}
            className="px-6 py-2 hover:bg-gray-100"
          >
            취소
          </Button>
        )}
        <Button 
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          {initialData ? '수정하기' : '작성하기'}
        </Button>
      </div>
    </form>
  );
};
