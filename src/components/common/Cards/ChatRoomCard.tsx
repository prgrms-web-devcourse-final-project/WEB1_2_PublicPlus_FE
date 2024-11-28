// components/common/Cards/ChatRoomCard.tsx
import Image from 'next/image';
import styles from './Card.module.css';

interface ChatRoomCardProps {
  name: string;
  lastMessage: string;
  timestamp: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string; // 농구, 트래킹 등의 카테고리
}

export const ChatRoomCard = ({
  name,
  lastMessage,
  timestamp,
  imageSrc = '/icons/profile.png',
  imageAlt = '프로필 이미지',
  category = '농구'
}: ChatRoomCardProps) => {
  return (
    <div className={`${styles.card} bg-primary-50`}>
      <div className="flex items-start">
        <div className="relative h-10 w-10 shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{name}</span>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <div className="mt-1">
            <span className="mr-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {category}
            </span>
            <span className="text-sm text-gray-500">{lastMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
