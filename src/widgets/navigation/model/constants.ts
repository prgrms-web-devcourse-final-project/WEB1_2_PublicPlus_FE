// constants.ts
import { NavItemType } from '../../../components/common/Navigation/types';

export const NAV_ITEMS: NavItemType[] = [
  {
    label: '홈',
    href: '/',
    iconSrc: {
      default: '/icons/nav/home.png',
      active: '/icons/nav/home-active.png'
    }
  },
  {
    label: '운동시설',
    href: '/facility',
    iconSrc: {
      default: '/icons/nav/facilities.png',
      active: '/icons/nav/facilities-active.png'
    }
  },
  // {
  //   label: '채팅',
  //   href: '/chat',
  //   iconSrc: {
  //     default: '/icons/nav/chat.png',
  //     active: '/icons/nav/chat-active.png'
  //   }
  // },
  {
    label: '모임',
    href: '/meeting',
    iconSrc: {
      default: '/icons/nav/meetings.png',
      active: '/icons/nav/meetings-active.png'
    }
  },
  {
    label: '프로필',
    href: '/profile',
    iconSrc: {
      default: '/icons/nav/mypage.png',
      active: '/icons/nav/mypage-active.png'
    }
  }
];
