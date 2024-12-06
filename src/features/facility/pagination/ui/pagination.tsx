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
  const pageGroupSize = 5;
  const currentGroup = Math.floor(currentPage / pageGroupSize);
  const startPage = currentGroup * pageGroupSize;
  const endPage = Math.min(startPage + pageGroupSize, totalPages);

  const prevGroupPage = startPage - pageGroupSize;
  const nextGroupPage = startPage + pageGroupSize;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="gray"
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}>
          {'<<'}
        </Button>
        <Button
          variant="gray"
          onClick={() => onPageChange(prevGroupPage)}
          disabled={startPage === 0}>
          이전
        </Button>

        {Array.from(
          { length: Math.min(pageGroupSize, endPage - startPage) },
          (_, i) => {
            const pageNum = startPage + i;
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? 'primary' : 'gray'}
                onClick={() => onPageChange(pageNum)}>
                {pageNum + 1}
              </Button>
            );
          }
        )}

        <Button
          variant="gray"
          onClick={() => onPageChange(nextGroupPage)}
          disabled={endPage === totalPages}>
          다음
        </Button>
        <Button
          variant="gray"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}>
          {'>>'}
        </Button>
      </div>
    </div>
  );
};
