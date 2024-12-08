'use client';

import {
  onMessageListener,
  requestNotificationPermission
} from '@/shared/lib/firebase/messaging';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    const initNotifications = async () => {
      await requestNotificationPermission();

      const unsubscribe = onMessageListener().then((payload: any) => {
        // 알림 toast 표시
        const notificationToast = toast.info(
          payload.notification?.title || '새로운 알림',
          {
            position: 'top-right',
            autoClose: 5000,
            onClick: () => {
              // 알림 클릭 시 알림 페이지로 이동
              router.push('/notifications');
              toast.dismiss(notificationToast);
            }
          }
        );
      });

      return () => {
        unsubscribe;
      };
    };

    initNotifications();
  }, []);

  return null;
}
