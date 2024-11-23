// components/common/search/FilterKeyword.tsx
interface FilterKeywordProps {
  filters: Array<{
    id: string;
    label: string;
    active: boolean;
  }>;
  onToggle: (id: string) => void;
}

export const FilterKeyword = ({ filters, onToggle }: FilterKeywordProps) => (
  <div className="flex gap-2 overflow-x-auto py-2">
    {filters.map(filter => (
      <div
        key={filter.id}
        onClick={() => onToggle(filter.id)}
        className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-primary px-4 py-2 text-sm ${
          filter.active
            ? 'bg-primary text-white'
            : 'bg-white text-primary hover:bg-primary hover:text-white'
        }`}>
        {filter.label}
      </div>
    ))}
  </div>
);
