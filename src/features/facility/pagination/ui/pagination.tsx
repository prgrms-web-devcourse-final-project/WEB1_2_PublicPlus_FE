import { Button } from '@/components/common/Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="gray"
          onclick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}>
          이전
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={i === currentPage ? 'primary' : 'gray'}
            onclick={() => onPageChange(i)}>
            {i + 1}
          </Button>
        ))}
        <Button
          variant="gray"
          onclick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}>
          다음
        </Button>
      </div>
    </div>
  );
};
