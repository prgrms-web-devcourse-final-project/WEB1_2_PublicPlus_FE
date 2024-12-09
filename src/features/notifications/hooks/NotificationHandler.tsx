'use client';

import {
  onMessageListener,
  requestNotificationPermission
} from '@/shared/lib/firebase/messaging';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Firebase 메시지 payload 타입 정의
interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
  };
  data?: Record<string, string>;
}

export function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    const initNotifications = async () => {
      await requestNotificationPermission();

      const unsubscribe = onMessageListener().then(
        (payload: NotificationPayload) => {
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
        }
      );

      return () => {
        if (unsubscribe && typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    };

    initNotifications();
  }, [router]); // router 의존성 추가

  return null;
}
