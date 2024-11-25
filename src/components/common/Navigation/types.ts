export type TabType = 'home' | 'search' | 'chat' | 'calendar' | 'profile';

export interface NavItemType {
  label: string;
  href: string;
  iconSrc: {
    default: string;
    active: string;
  };
}

export interface NavigationProps {
  activeTab: TabType;
}

export interface NavItemProps extends NavItemType {
  active: boolean;
}
