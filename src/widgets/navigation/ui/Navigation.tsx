import { NavigationProps } from '@/components/common/Navigation/types';
import styles from './Navigation.module.css';
import { NAV_ITEMS } from '@/widgets/navigation/model/constants';
import { NavItem } from '@/components/common/Navigation/NavItem';

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
