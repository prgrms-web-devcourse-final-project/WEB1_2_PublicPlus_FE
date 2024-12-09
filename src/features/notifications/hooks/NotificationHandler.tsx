'use client';

import {
  onMessageListener,
  requestNotificationPermission
} from '@/shared/lib/firebase/messaging';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    const initNotifications = async () => {
      await requestNotificationPermission();

      const unsubscribe = onMessageListener().then((payload: any) => {
        if ('Notification' in window) {
          const notification = new Notification(
            payload.notification?.title || '공공플러스 알림',
            {
              body: payload.notification?.body || '',
              icon: payload.notification?.icon || ''
            }
          );

          notification.onclick = () => {
            router.push('/');
            notification.close();
          };
        }
      });

      return () => {
        unsubscribe;
      };
    };

    initNotifications();
  }, []);

  return null;
}
