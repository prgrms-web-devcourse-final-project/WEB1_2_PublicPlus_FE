import { useState } from 'react';
import { ReviewDTO } from '@/shared/api/generated';
import { Button } from '@/shared/ui/components/button/Button';
import { Rating } from '@/widgets/rating/Rating';
import { TagInput } from '@/widgets/tag-input/TagInput';

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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4">
      <div className="space-y-2">
        <Rating
          value={rating}
          onChange={setRating}
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="리뷰를 작성해주세요"
          className="min-h-[100px] w-full"
        />
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="태그를 입력하세요"
          maxTags={5}
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="line"
            onClick={onCancel}>
            취소
          </Button>
        )}
        <Button type="submit">{initialData ? '수정하기' : '작성하기'}</Button>
      </div>
    </form>
  );
};
