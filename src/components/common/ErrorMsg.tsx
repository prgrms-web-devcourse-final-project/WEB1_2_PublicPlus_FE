interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage = ({
  message = '알 수 없는 오류가 발생했습니다.',
  className = ''
}: ErrorMessageProps) => {
  return (
    <div
      className={`flex items-center rounded-lg border border-error-200 bg-gray-50 p-3 ${className} `}>
      {/* 아이콘 영역 */}
      <div className="mr-3 text-error-500">❌</div>

      {/* 메시지 영역 */}
      <div className="flex-1 text-gray-700">
        <span className="text-error-600 font-semibold">오류:</span>
        {` ${message}`}
      </div>
    </div>
  );
};

export default ErrorMessage;
