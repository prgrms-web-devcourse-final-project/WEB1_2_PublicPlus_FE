// components/common/Header/Header.tsx
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {
          <Link
            href="/"
            className={styles.logo}>
            <Image
              src="/icons/logo.png"
              alt="PublicPlus"
              width={60}
              height={40}
            />
          </Link>
        }

        <div className={styles.iconGroup}>
          <button className={styles.iconButton}>
            <Image
              src="/icons/notification.png"
              alt="알림"
              width={26}
              height={26}
            />
          </button>
          <button className={`${styles.iconButton} ${styles.calendarIcon}`}>
            <Image
              src="/icons/calendar.png"
              alt="캘린더"
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
  )
}
