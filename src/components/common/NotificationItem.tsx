import Image from 'next/image';
import { Button } from '@/components/common/Button/Button';

export interface NotificationItemProps {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  onMarkAsRead?: () => void;
}

export const NotificationItem = ({
  id,
  title,
  message,
  isRead,
  createdAt,
  onMarkAsRead
}: NotificationItemProps) => {
  const bgColor = !isRead ? 'bg-primary-50' : 'bg-white';

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
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-700">{message}</p>
          </div>
          {!isRead && onMarkAsRead && (
            <div
              className="mt-4"
              onClick={onMarkAsRead}>
              <Button size="sm">읽음</Button>
            </div>
          )}
        </div>
        <div className="ml-2 flex-shrink-0 text-xs text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
