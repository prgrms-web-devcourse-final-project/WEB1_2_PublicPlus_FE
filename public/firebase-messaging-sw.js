importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyAWUKgJZsNBXvk9fH8A-k1oYWtDEr2BAdQ',
  projectId: 'public-plus-push-notification',
  messagingSenderId: '810803776114',
  appId: '1:810803776114:web:aa14d1c9b290b0124a10eb'
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const notificationTitle = payload.data.title || '새로운 알림';
  const notificationOptions = {
    body: payload.data.body || '알림이 도착했습니다.',
    icon: payload.data.icon || '/path/to/default-icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
