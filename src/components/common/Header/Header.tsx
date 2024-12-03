'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { DETAIL_PAGE_PATTERNS } from '@/shared/config/constants';

interface HeaderProps {
  detailTitle?: string; // 디테일 페이지의 타이틀
}

const getDefaultTitle = (pathname: string) => {
  if (pathname?.includes('/facility/')) return '시설 상세';
  if (pathname?.includes('/meeting/create')) return '모임 상세';
  return '상세 정보';
};

export const Header = ({ detailTitle }: HeaderProps) => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkNewNotifications = async () => {
      try {
        setHasNotifications(true);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    checkNewNotifications();
  }, []);

  // facility/[id] 패턴의 URL인지 확인
  const isDetailPage = DETAIL_PAGE_PATTERNS.some(pattern =>
    pathname?.includes(pattern)
  );

  const notificationIcon = hasNotifications
    ? '/icons/notification-new.png'
    : '/icons/notification.png';

  // 디테일 페이지용 헤더
  if (isDetailPage) {
    return (
      <header className="fixed left-0 right-0 top-0 z-40 mx-auto h-[56px] w-full max-w-[600px] bg-white">
        <div className="relative flex h-full w-full items-center justify-center px-4 md:px-6">
          <button
            className="absolute left-[1.5rem] flex cursor-pointer items-center rounded-lg border border-none border-gray-200 bg-none p-2"
            onClick={() => router.back()}>
            <Image
              src="/icons/back-arrow.png"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
          <h1 className={styles.detailTitle}>
            {detailTitle || getDefaultTitle(pathname)}
          </h1>
        </div>
      </header>
    );
  }

  // 기본 헤더
  return (
    <header className="fixed left-0 right-0 top-0 z-40 mx-auto h-[56px] w-full max-w-[600px] bg-white">
      <div className="flex h-full w-full items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center">
          <Image
            src="/icons/logo.png"
            alt="PublicPlus"
            width={70}
            height={40}
          />
        </Link>

        <div className="flex items-center justify-center gap-2">
          <button
            className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200"
            onClick={() => router.push('/notifications')}>
            <Image
              src={notificationIcon}
              alt="알림"
              width={26}
              height={26}
            />
          </button>
          <button className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200">
            <Image
              src="/icons/calendar.png"
              alt="내 일정"
              width={22}
              height={22}
            />
          </button>
          <button className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200">
            <Image
              src="/icons/search.png"
              alt="검색"
              width={22}
              height={22}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
