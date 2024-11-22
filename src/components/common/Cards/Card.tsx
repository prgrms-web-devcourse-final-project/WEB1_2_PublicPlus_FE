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
}

export const Card = ({
  image,
  title,
  content,
  footer,
  imageAlt = 'Card Image',
  className = ''
}: CardProps) => (
  <div className={`${styles.card} ${className} flex`}>
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
