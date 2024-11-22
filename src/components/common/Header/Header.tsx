// components/common/Header/Header.tsx

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export const Header = () => {
  const [hasNotifications, setHasNotifications] = useState(false);

  const notificationIcon = hasNotifications
    ? '/icons/notification-new.png'
    : '/icons/notification.png';

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
            onClick={() => setHasNotifications(!hasNotifications)}>
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
