// components/common/BottomNav/NavItem.tsx
import Link from 'next/link'
import Image from 'next/image'
import styles from './NavItem.module.css'
import { NavItemProps } from './types'

export const NavItem = ({ label, href, iconSrc, active }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={styles.navItem}>
      <div className={styles.iconWrapper}>
        <Image
          src={active ? iconSrc.active : iconSrc.default}
          alt={label}
          width={24}
          height={24}
          className={styles.icon}
        />
      </div>
      <span className={`${styles.label} ${active ? styles.active : ''}`}>
        {label}
      </span>
    </Link>
  )
}
