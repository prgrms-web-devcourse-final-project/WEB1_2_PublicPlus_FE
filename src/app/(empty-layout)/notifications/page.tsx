'use client';
import { CustomHeader } from '@/widgets/header/ui/CustomHeader';
import { NotificationList } from '@/features/notifications/ui/NotificationList';
import { useNotifications } from '@/shared/hooks/useNotifications';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead } = useNotifications();

  return (
    <div className="flex flex-col">
      <CustomHeader title="알림" />
      <main className="flex-1">
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markNotificationAsRead}
        />
      </main>
    </div>
  );
}
