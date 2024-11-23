// Navigation.tsx
import { NavigationProps } from './types';
import { NavItem } from './NavItem';
import { NAV_ITEMS } from './constants';
import styles from './Navigation.module.css';

export const Navigation = ({ activeTab }: NavigationProps) => {
  return (
    <nav className={styles.navigation}>
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
  );
};
