// EditCard.tsx
import Image from 'next/image';
import styles from './Card.module.css';
import { ChevronRight } from 'lucide-react';

interface EditCardProps {
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  onClick: () => void;
}

export const EditCard = ({
  title,
  description,
  image,
  onClick
}: EditCardProps) => (
  <button
    onClick={onClick}
    className={styles.card}>
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col items-start justify-between space-y-4">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {image && (
            <div className="relative h-24 w-24">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-xl object-cover"
              />
            </div>
          )}
        </div>
        <div className="text-gray-400">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  </button>
);
