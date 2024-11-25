'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CustomHeader.module.css';

interface CustomHeaderProps {
  title?: string;
  rightButton?: {
    icon: string;
    alt: string;
    onClick?: () => void;
  };
}

export const CustomHeader = ({ title, rightButton }: CustomHeaderProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className={styles.customHeader}>
      <div className={styles.headerContent}>
        <button
          className={styles.backButton}
          onClick={handleGoBack}>
          <Image
            src="/icons/left-arrow.png"
            alt="뒤로가기"
            width={24}
            height={24}
          />
        </button>
        {title && <h1 className={styles.headerTitle}>{title}</h1>}

        {rightButton && (
          <button
            className={styles.rightButton}
            onClick={rightButton.onClick}>
            <Image
              src={rightButton.icon}
              alt={rightButton.alt}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </header>
  );
};
