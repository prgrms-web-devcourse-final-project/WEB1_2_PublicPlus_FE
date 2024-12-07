'use client';
import { CustomHeader } from '@/widgets/Header/ui/CustomHeader';
import { NotificationList } from '@/features/notifications/ui/NotificationList';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col">
      <CustomHeader title="알림" />
      <main className="flex-1">
        <NotificationList />
      </main>
    </div>
  );
}
