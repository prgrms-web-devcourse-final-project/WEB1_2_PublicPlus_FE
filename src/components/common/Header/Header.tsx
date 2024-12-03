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

  // 임시로 알림 데이터를 가져오는 부분 ------------------
  useEffect(() => {
    const checkNewNotifications = async () => {
      try {
        // const response = await fetchNotifications();
        // setHasNotifications(response.hasUnread);
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
      <header className={styles.header}>
        <div className={styles.iconWrap}>
          <button
            className={styles.backButton}
            onClick={() => router.back()}>
            <Image
              src="/icons/back-arrow.png" // 뒤로가기 아이콘 이미지 필요
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
    <header className={styles.header}>
      <div className={styles.iconWrap}>
        <Link
          href="/"
          className={styles.logo}>
          <Image
            src="/icons/logo.png"
            alt="PublicPlus"
            width={70}
            height={40}
          />
        </Link>

        <div className={styles.iconGroup}>
          <button
            className={styles.iconButton}
            onClick={() => router.push('/notifications')}>
            <Image
              src={notificationIcon}
              alt="알림"
              width={26}
              height={26}
            />
          </button>
          <button className={styles.iconButton}>
            <Image
              src="/icons/calendar.png"
              alt="내 일정"
              width={22}
              height={22}
            />
          </button>
          <button className={styles.iconButton}>
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
