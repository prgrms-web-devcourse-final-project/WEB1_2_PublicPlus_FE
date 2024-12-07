'use client';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

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
  const pathname = usePathname() ?? '/'; // null일 경우 기본값 '/' 사용

  const handleGoBack = () => {
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length > 1) {
      const newPath = '/' + pathSegments.slice(0, -1).join('/');
      router.push(newPath);
    } else {
      router.push('/');
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 mx-auto h-[56px] w-full bg-white">
      <div className="flex h-full w-full items-center justify-between px-4 md:px-6">
        <button
          className="flex items-center justify-center rounded-lg border border-gray-200 p-2"
          onClick={handleGoBack}>
          <Image
            src="/icons/left-arrow.png"
            alt="뒤로가기"
            width={24}
            height={24}
          />
        </button>
        {title && <h1 className="mx-auto text-m">{title}</h1>}

        {rightButton && (
          <button
            className="absolute right-4 flex items-center justify-center rounded-lg border border-gray-200 p-2"
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
