'use client';

import {
  onMessageListener,
  requestNotificationPermission
} from '@/shared/lib/firebase/messaging';
import { useEffect } from 'react';
import { toast, Id } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { MessagePayload } from 'firebase/messaging';

export function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    const initNotifications = async () => {
      await requestNotificationPermission();

      const messageListener = async () => {
        try {
          const payload = await onMessageListener();
          if (payload) {
            const notificationToast: Id = toast.info(
              (payload as MessagePayload).notification?.title || '새로운 알림',
              {
                position: 'top-right',
                autoClose: 5000,
                onClick: () => {
                  router.push('/notifications');
                  toast.dismiss(notificationToast);
                }
              }
            );
          }
        } catch (error) {
          console.error('Failed to process notification:', error);
        }
      };

      messageListener();

      // cleanup function
      return () => {
        // cleanup logic if needed
      };
    };

    initNotifications();
  }, [router]);

  return null;
}
