'use client';
import { NotificationItem } from '@/shared/ui/components/Notification/NotificationItem';
import { NotificationResponse } from '@/features/notifications/api/pushService';

interface NotificationListProps {
  notifications: NotificationResponse[];
  onMarkAsRead: (id: number) => void;
}

export const NotificationList = ({
  notifications,
  onMarkAsRead
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center text-gray-500">
        새 알림이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onMarkAsRead={() => onMarkAsRead(notification.id)}
        />
      ))}
    </div>
  );
};
