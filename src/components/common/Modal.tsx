// components/common/Modal.tsx
import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string; // 메시지 props 추가
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  onConfirm?: () => void; // 확인 버튼 클릭 핸들러
}

export const Modal = ({
  isOpen,
  onClose,
  title = '알림',
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-gray-100 p-6 shadow-xl">
        <h2 className="mb-4 flex justify-center text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <div className="space-y-8">
          <p className="text-center text-gray-700">{message}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleConfirm}
              className="rounded-lg px-16 py-2 text-gray-600 hover:bg-gray-200">
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg px-16 py-2 text-gray-500 hover:bg-gray-200">
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
