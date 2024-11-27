// components/common/Cards/Card.tsx
import Image from 'next/image';
import styles from './Card.module.css';
import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
  imageSrc?: string | null;
  imageAlt?: string;
  className?: string;
  color?: 'wh' | 'sky';
}

export const Card = ({
  title,
  content,
  footer,
  imageSrc = null, // 기본값을 null로 설정
  imageAlt = 'Card Image',
  className = '',
  color = 'wh'
}: CardProps) => {
  const bgColor = color === 'sky' ? 'bg-primary-50' : 'bg-white';

  return (
    <div
      className={` ${styles.card} ${className} ${bgColor} flex ${imageSrc ? '' : 'flex-col'}`}>
      <div
        className={`flex flex-col justify-between space-y-4 ${imageSrc ? 'mr-4 flex-1' : 'w-full'}`}>
        {title && <h3 className="text-m">{title}</h3>}
        {content && <div className="space-y-3">{content}</div>}
        {footer && <div>{footer}</div>}
      </div>
      {imageSrc && (
        <div className={styles.cardImage}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};
