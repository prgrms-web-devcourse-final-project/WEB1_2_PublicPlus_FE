// components/common/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  fullWidth?: boolean // Add this prop
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false // Default to false
}: ButtonProps) => {
  const baseStyle = 'rounded-lg font-medium transition-colors'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  // Add w-full class when fullWidth is true and size is lg
  const fullWidthClass = size === 'lg' && fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidthClass}`}>
      {children}
    </button>
  )
}
