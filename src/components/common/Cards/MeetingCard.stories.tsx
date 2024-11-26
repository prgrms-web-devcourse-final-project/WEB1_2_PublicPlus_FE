import type { Meta, StoryObj } from '@storybook/react';
import { MeetingCard } from './MeetingCard';

const meta = {
  title: 'Common/Cards/MeetingCard',
  component: MeetingCard,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    currentMembers: {
      description: '현재 참여 인원',
      control: { type: 'number', min: 0 }
    },
    maxMembers: {
      description: '최대 참여 가능 인원',
      control: { type: 'number', min: 1 }
    },
    tags: {
      description: '모임 관련 태그들',
      control: 'object'
    }
  },
  decorators: [
    Story => (
      <div className="max-w-3xl">
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
} satisfies Meta<typeof MeetingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모임 카드
export const Default: Story = {
  args: {
    title: '아침 요가 모임',
    date: '2024.03.20',
    time: '07:00-08:00',
    location: '강남구민체육센터',
    currentMembers: 3,
    maxMembers: 10,
    tags: ['초보환영', '아침운동', '요가'],
    image: '/jjang.jpeg'
  }
};

// 모집 상태별 모임 카드
export const MeetingStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <MeetingCard
        title="저녁 축구 모임"
        date="2024.03.21"
        time="19:00-21:00"
        location="서초풋살장"
        currentMembers={5}
        maxMembers={10}
        tags={['축구', '저녁운동', '실력무관']}
      />
      <MeetingCard
        title="주말 테니스"
        date="2024.03.22"
        time="14:00-16:00"
        location="역삼테니스장"
        currentMembers={10}
        maxMembers={10}
        tags={['테니스', '주말운동', '마감임박']}
      />
    </div>
  )
};

// 여러 태그를 가진 모임 카드
export const WithMultipleTags: Story = {
  args: {
    title: '복합 운동 모임',
    date: '2024.03.23',
    time: '10:00-12:00',
    location: '종합스포츠센터',
    currentMembers: 8,
    maxMembers: 15,
    tags: ['헬스', '요가', '초보환영', '전문강사', '주말운동', '정기모임'],
    image: '/jjang.jpeg'
  }
};
