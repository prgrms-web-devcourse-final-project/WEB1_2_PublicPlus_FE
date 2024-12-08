import Image from 'next/image';
import styles from './Card.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  color?: 'wh' | 'sky';
  domain?: string;
  id?: string;
  target?: string;
  url?: string;
}

export const LinkCard = ({
  title,
  content,
  footer,
  imageSrc = 'https://placehold.co/200',
  imageAlt = 'Card Image',
  className = '',
  color = 'wh',
  domain,
  id,
  target,
  url
}: CardProps) => {
  const bgColor = color === 'sky' ? 'bg-primary-50' : 'bg-white';

  return (
    <Link
      href={url ? url : `/${domain}/${id}`}
      target={target}
      className={`${styles.card} ${className} ${bgColor} flex`}>
      <div className="mr-4 flex flex-1 flex-col justify-between space-y-4">
        {title && <h3 className="text-xl font-medium">{title}</h3>}
        {content && <div className="space-y-3 text-base">{content}</div>}
        {footer && <div className="text-base">{footer}</div>}
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
    </Link>
  );
};
