interface TagProps {
  label: string | number;
  variant?: 'gray' | 'blue' | 'line';
  size?: 'sm' | 'md';
  styleName?: object;
}

export const Tag = ({
  label,
  variant = 'blue',
  size = 'sm',
  styleName
}: TagProps) => {
  const baseStyles =
    'rounded-full inline-flex items-center justify-center whitespace-nowrap';
  const variantStyles = {
    gray: 'bg-gray-200 text-gray-600',
    blue: 'bg-blue-500 text-white',
    line: 'border border-gray-400 bg-white text-gray-600'
  };
  const sizeStyles = {
    sm: 'px-2 py-2 text-[10px] sm:text-xs',
    md: 'px-3 py-1.5 text-2xs sm:text-xs'
  };

  return (
    <span
      style={styleName}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {label}
    </span>
  );
};
