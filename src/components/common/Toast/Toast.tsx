// components/common/Toast/Toast.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoving(true);
    }, duration);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration + 400); // 애니메이션 시간 고려

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  const toastStyles = {
    success: 'bg-success-50 text-success-900 border-success-200',
    error: 'bg-error-50 text-error-900 border-error-200',
    warning: 'bg-warning-50 text-warning-900 border-warning-200',
    info: 'bg-primary-50 text-primary-900 border-primary-200'
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={` ${styles.toast} ${toastStyles[type]} ${isRemoving ? styles['toast-exit'] : styles['toast-enter']} `}>
      {message}
    </div>,
    document.body
  );
};

export const useToast = () => {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  const showToast = (props: Omit<ToastProps, 'onClose'>) => {
    setToastProps({ ...props, onClose: () => setToastProps(null) });
  };

  const ToastComponent = toastProps ? <Toast {...toastProps} /> : null;

  return { showToast, ToastComponent };
};
