interface ButtonProps {
  variant?: 'primary' | 'line' | 'gray' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  disabled = false
}: ButtonProps) => {
  const baseStyle = 'rounded font-medium transition-colors focus:outline-none';

  const variants = {
    primary: `
      bg-primary-500 
      text-white 
      hover:bg-primary-600 
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `,
    line: `
      bg-white 
      text-primary-500 
      border border-primary-500 
      hover:bg-primary-50
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `,
    gray: `
      bg-gray-100 
      text-gray-800 
      hover:bg-gray-200
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `,
    badge: `
      bg-white 
      text-primary-500 
      border border-primary-500 
      rounded-xl
      hover:bg-primary-50
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    badge: 'px-3 py-1 text-xs rounded-full'
  };

  const fullWidthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={` ${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidthClass} `}
      disabled={disabled}>
      {children}
    </button>
  );
};