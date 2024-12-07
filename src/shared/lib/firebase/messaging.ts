'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from './firebaseConfig';

export function initializeFirebaseApp() {
  // 클라이언트 사이드에서만 실행
  if (typeof window !== 'undefined') {
    // 이미 앱이 초기화되어 있다면 기존 앱 반환
    if (getApps().length) {
      return getApps()[0];
    }

    // 새로운 앱 초기화
    return initializeApp(firebaseConfig);
  }

  return null;
}

export function getFirebaseMessaging() {
  const app = initializeFirebaseApp();
  return app ? getMessaging(app) : null;
}

export async function requestNotificationPermission() {
  // 브라우저 환경 체크
  if (typeof window === 'undefined') return null;

  try {
    // 서비스 워커 명시적 등록
    const swRegistration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: swRegistration // 서비스 워커 등록 전달
      });

      return token;
    }
  } catch (error) {
    console.error('Token request failed', error);
    return null;
  }
}

export function onMessageListener() {
  const messaging = getFirebaseMessaging();

  if (!messaging) {
    return Promise.resolve(null);
  }

  return new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
}
