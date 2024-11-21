// components/common/Tag.tsx
interface TagProps {
  label: string;
  variant?: 'default' | 'blue';
  size?: 'sm' | 'md';
}

export const Tag = ({ label, variant = 'blue', size = 'sm' }: TagProps) => {
  const baseStyles = 'rounded-full inline-flex items-center justify-center';
  const variantStyles = {
    default: 'bg-gray-50 text-gray-600',
    blue: 'bg-blue-500 text-white'
  };
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {label}
    </span>
  );
};
