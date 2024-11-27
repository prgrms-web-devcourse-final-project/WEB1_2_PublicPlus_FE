export type TabType = 'home' | 'facility' | 'chat' | 'meeting' | 'profile';

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
