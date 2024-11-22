'use client';
import { useToast } from '@/components/common/Toast/Toast';

export default function ToastPage() {
  const { showToast, ToastComponent } = useToast();

  const handleClick = () => {
    showToast({
      message: '토스트 메시지입니다!!!',
      type: 'success',
      duration: 3000
    });
  };

  return (
    <>
      <button onClick={handleClick}>클릭크</button>
      {ToastComponent}
    </>
  );
}
