import { useEffect, useState } from 'react';

interface UseCountdownOptions {
  initialTime?: number;
  onComplete?: () => void;
}

export const useCountdown = ({
  initialTime = 180,
  onComplete
}: UseCountdownOptions = {}) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const start = (time?: number) => {
    setRemainingTime(time || initialTime);
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
    setRemainingTime(initialTime);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, remainingTime, onComplete]);

  return {
    remainingTime,
    isActive,
    start,
    stop,
    formatTime
  };
};
