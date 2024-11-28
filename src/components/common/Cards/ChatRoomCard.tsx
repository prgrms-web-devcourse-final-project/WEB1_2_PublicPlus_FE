// components/common/Cards/ChatRoomCard.tsx
import Image from 'next/image';
import styles from './Card.module.css';

interface ChatRoomCardProps {
  name: string;
  latestMessage: string;
  latestTimestamp: string;
  imageSrc?: string;
  imageAlt?: string;
  sports?: string; // 농구, 트래킹 등의 카테고리
}

export const ChatRoomCard = ({
  name,
  latestMessage,
  latestTimestamp,
  imageSrc = '/jjang.jpeg',
  imageAlt = '프로필 이미지',
  sports = '농구'
}: ChatRoomCardProps) => {
  return (
    <div className={`${styles.card} bg-primary-50`}>
      <div className="flex items-center p-1">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="ml-6 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-bold text-gray-900 md:text-m">
                {name}
              </span>
              {sports === '' ? (
                ''
              ) : (
                <span className="ml-6 inline-block rounded-lg border border-primary-500 px-4 py-2 text-xs text-primary-600">
                  {sports}
                </span>
              )}
            </div>
            <span className="mt-1 text-xs text-gray-500">
              {latestTimestamp}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-sm text-gray-500">{latestMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
