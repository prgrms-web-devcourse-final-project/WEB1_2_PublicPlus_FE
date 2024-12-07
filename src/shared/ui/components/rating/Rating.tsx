import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
}

export const Rating = ({
  value,
  onChange,
  readOnly = false,
  className
}: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index);
    }
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {[1, 2, 3, 4, 5].map(index => (
        <Star
          key={index}
          className={cn(
            'h-6 w-6 cursor-default transition-colors',
            !readOnly && 'cursor-pointer',
            (hoverValue !== null ? index <= hoverValue : index <= value)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          )}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
