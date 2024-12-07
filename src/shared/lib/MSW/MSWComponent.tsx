'use client';

import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === 'development') {
        const initMsw = await import('../../../mocks').then(res => res.initMsw);
        await initMsw();
        setMswReady(true);
      } else {
        setMswReady(true);
      }
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady && process.env.NODE_ENV === 'development') {
    return null; // MSW가 초기화되기 전까지 렌더링 지연
  }

  return <>{children}</>;
};
