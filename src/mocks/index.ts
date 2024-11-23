export async function initMsw() {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      // 서버 사이드에서 실행될 때
      const { server } = await import('./server');
      server.listen({ onUnhandledRequest: 'bypass' });
    } else {
      // 클라이언트 사이드에서 실행될 때
      const { worker } = await import('./browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
    }
  }
}
