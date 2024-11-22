import Image from 'next/image';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = '검색어를 입력하세요',
  className = ''
}: SearchBarProps) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full bg-gray-50 pl-6 pr-12 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="absolute right-4 flex items-center opacity-50">
        <button>
          <Image
            width={20}
            height={20}
            alt="검색"
            src={'/icons/search.png'}
          />
        </button>
      </div>
    </div>
  );
};
