'use client';
import { NotificationItem } from '@/shared/ui/components/Notification/NotificationItem';
import { useState } from 'react';

interface Notification {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
  hasAcceptButton?: boolean;
}

export const NotificationList = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      message: '홍길동님이 운동 메이트를 신청했습니다.',
      time: '10분 전',
      isRead: false,
      hasAcceptButton: true
    },
    {
      id: 2,
      message: '체육관 예약이 확정되었습니다.',
      time: '1시간 전',
      isRead: true
    },
    {
      id: 3,
      message: '체육관 예약이 확정되었습니다.',
      time: '1시간 전',
      isRead: true
    }
  ]);

  const handleAccept = (id: number) => {
    console.log(`Accepted notification ${id}`);
  };

  return (
    <div className="flex flex-col space-y-1">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          message={notification.message}
          time={notification.time}
          variant={notification.isRead ? 'default' : 'new'}
          onAccept={
            notification.hasAcceptButton
              ? () => handleAccept(notification.id)
              : undefined
          }
        />
      ))}
    </div>
  );
};
