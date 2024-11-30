import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { cn } from '@/shared/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export const TagInput = ({
  value,
  onChange,
  placeholder = '태그 입력 후 Enter',
  maxTags = 5,
  className
}: TagInputProps) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && input === '') {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmedInput = input.trim();
    if (
      trimmedInput &&
      !value.includes(trimmedInput) &&
      value.length < maxTags
    ) {
      onChange([...value, trimmedInput]);
      setInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      {value.length < maxTags && (
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="mt-2"
        />
      )}
      <p className="text-sm text-gray-500">
        {value.length}/{maxTags} 태그 사용 중
      </p>
    </div>
  );
};
