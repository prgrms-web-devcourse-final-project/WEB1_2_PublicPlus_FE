interface UserInfoCardProps {
  title: string;
  children: React.ReactNode;
  buttonLabel?: string;
  onClick?: () => void;
  className?: string;
}

export const UserInfoCard = ({
  title,
  children,
  buttonLabel = '작성하기',
  onClick,
  className = ''
}: UserInfoCardProps) => {
  return (
    <div className={`rounded-2xl p-6 shadow-md ${className}`}>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{title}</h3>
          <button
            onClick={onClick}
            className="text-sm text-blue-500 hover:text-blue-600">
            {buttonLabel}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
