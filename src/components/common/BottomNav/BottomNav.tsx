// components/common/BottomNav/BottomNav.tsx
import { BottomNavProps } from './types'
import { NavItem } from './NavItem'
import { NAV_ITEMS } from './constants'
import styles from './BottomNav.module.css'

export const BottomNav = ({ activeTab }: BottomNavProps) => {
  return (
    <nav className={styles.bottomNav}>
      {NAV_ITEMS.map(item => (
        <NavItem
          key={item.href}
          {...item}
          active={
            activeTab === (item.href === '/' ? 'home' : item.href.slice(1))
          }
        />
      ))}
    </nav>
  )
}
