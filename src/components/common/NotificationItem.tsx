import Image from 'next/image';
import { Button } from '@/shared/ui/components/button/Button';

interface NotificationItemProps {
  message: string;
  time?: string;
  onAccept?: () => void;
  variant?: 'default' | 'new';
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
      className={`flex h-[88px] min-h-[88px] items-start justify-between ${bgColor} rounded-sm p-4 py-8 shadow-sm`}>
      <div className="flex w-full items-start gap-3">
        <div className="">
          <Image
            width={24}
            height={24}
            src="/jjang.jpeg"
            alt="프로필사진"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <p className="text-sm text-gray-900">{message}</p>
          {onAccept && (
            <div
              className="mt-4"
              onClick={onAccept}>
              <Button size="sm">수락</Button>
            </div>
          )}
        </div>
        <div className="ml-2 flex-shrink-0 text-xs text-gray-500">{time}</div>
      </div>
    </div>
  );
};
