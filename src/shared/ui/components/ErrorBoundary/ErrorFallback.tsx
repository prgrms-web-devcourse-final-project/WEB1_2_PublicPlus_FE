interface ErrorFallbackProps {
  error?: Error;
  message?: string;
  className?: string;
}

const ErrorFallback = ({
  error,
  message,
  className = 'min-h-screen'
}: ErrorFallbackProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <h2 className="text-xl font-bold">{message || '문제가 발생했습니다'}</h2>
      <p className="mt-2 text-gray-600">{error?.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-primary/90">
        새로고침
      </button>
    </div>
  );
};

export default ErrorFallback;
