'use client';

import { useState, useEffect } from 'react';
import { onMessageListener } from '../lib/firebase';
import { NotificationResponse } from '@/features/notifications/api/pushService';

export interface FirebaseNotification {
  notification?: {
    title?: string;
    body?: string;
  };
}

export function useNotifications() {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );

  useEffect(() => {
    const handleNewNotification = async () => {
      const listener = await onMessageListener();

      if (listener) {
        // 새로운 알림 상태 업데이트
        setHasNewNotifications(true);

        const newNotification: NotificationResponse = {
          id: Date.now(), // 임시 ID
          title:
            (listener as FirebaseNotification).notification?.title ||
            '새로운 알림',
          message:
            (listener as FirebaseNotification).notification?.body ||
            '알림 내용',
          isRead: false,
          createdAt: new Date().toISOString()
        };

        // 새 알림을 리스트 맨 앞에 추가
        setNotifications(prev => [newNotification, ...prev]);

        // 일정 시간 후 새 알림 상태 초기화
        setTimeout(() => {
          setHasNewNotifications(false);
        }, 5000);
      }
    };

    handleNewNotification();
  }, []);

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return {
    notifications,
    hasNewNotifications,
    markNotificationAsRead
  };
}
