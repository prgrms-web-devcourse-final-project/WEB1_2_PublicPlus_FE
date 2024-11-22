interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading = ({
  message = '로딩 중...',
  size = 'md'
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]} `}
      />
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};

// 전체 화면 로딩
export const FullScreenLoading = ({ message }: { message?: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <Loading
        message={message}
        size="lg"
      />
    </div>
  );
};
