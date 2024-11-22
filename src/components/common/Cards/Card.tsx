// components/common/Cards/Card.tsx
import Image from 'next/image';
import styles from './Card.module.css';
import { ReactNode } from 'react';

interface CardProps {
  image?: string;
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
  imageAlt?: string;
  className?: string;
  color?: 'wh' | 'sky';
}

export const Card = ({
  image,
  title,
  content,
  footer,
  imageAlt = 'Card Image',
  className = '',
  color = 'wh'
}: CardProps) => {
  const bgColor = color === 'sky' ? 'bg-primary-50' : 'bg-white';

  return (
    <div className={`${styles.card} ${className} ${bgColor} flex`}>
      <div className="mr-4 flex flex-1 flex-col justify-between space-y-4">
        {title && <h3 className="text-m">{title}</h3>}
        {content && <div className="space-y-3">{content}</div>}
        {footer && <div>{footer}</div>}
      </div>
      {image && (
        <div className={styles.cardImage}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};
