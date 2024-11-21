// components/common/BottomNav/constants.ts
import { NavItemType } from './types'

export const NAV_ITEMS: NavItemType[] = [
  {
    label: '홈',
    href: '/',
    iconSrc: {
      default: '/icons/nav/icon_home.png',
      active: '/icons/nav/icon_home_active.png'
    }
  },
  {
    label: '운동시설',
    href: '/facility',
    iconSrc: {
      default: '/icons/nav/icon_exercise.png',
      active: '/icons/nav/icon_exercise_active.png'
    }
  },
  {
    label: '채팅',
    href: '/chat',
    iconSrc: {
      default: '/icons/nav/icon_chat.png',
      active: '/icons/nav/icon_chat_active.png'
    }
  },
  {
    label: '모임',
    href: '/meeting',
    iconSrc: {
      default: '/icons/nav/icon_meeting.png',
      active: '/icons/nav/icon_meeting_active.png'
    }
  },
  {
    label: '프로필',
    href: '/profile',
    iconSrc: {
      default: '/icons/nav/icon_my.png',
      active: '/icons/nav/icon_my_active.png'
    }
  }
]
