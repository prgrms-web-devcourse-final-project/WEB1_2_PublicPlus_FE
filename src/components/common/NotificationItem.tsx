import Image from 'next/image';
import { Button } from './Button/Button';

interface NotificationItemProps {
  message: string;
  time?: string;
  onAccept?: () => void;
  variant?: 'default' | 'new'; // 배경색 variant 추가
}

export const NotificationItem = ({
  message,
  time = '방금 전',
  onAccept,
  variant = 'default'
}: NotificationItemProps) => {
  const bgColor = variant === 'new' ? 'bg-primary-50' : 'bg-white';

  return (
    <div
      className={`flex items-center justify-between ${bgColor} p-4 py-6 shadow-sm`}>
      <div className="flex items-start gap-3">
        <div className="">
          <Image
            width={24}
            height={24}
            src="/jjang.jpeg"
            alt="프로필사진"
            className="w-full rounded-full"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <p className="text-sm text-gray-900">{message}</p>
          {onAccept && (
            <div onClick={onAccept}>
              <Button size="sm">수락</Button>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    </div>
  );
};
