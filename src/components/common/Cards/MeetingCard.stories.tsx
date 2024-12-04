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
    maxParticipants: {
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
    id: '1',
    mbTitle: '아침 요가 모임',
    mbDate: '2024.03.20',
    endDate: '2024.03.21',
    mbTime: '07:00-08:00',
    mbLocation: '강남구민체육센터',
    currentMembers: 3,
    maxParticipants: 10,
    tags: ['초보환영', '아침운동', '요가'],
    image: '/jjang.jpeg',
    domain: 'meeting'
  }
};

// 모집 상태별 모임 카드
export const MeetingStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <MeetingCard
        id="2"
        mbTitle="저녁 축구 모임"
        mbDate="2024.03.21"
        endDate="2024.03.22"
        mbTime="19:00-21:00"
        mbLocation="서초풋살장"
        currentMembers={5}
        maxParticipants={10}
        tags={['축구', '저녁운동', '실력무관']}
        domain="meeting"
      />
      <MeetingCard
        id="3"
        mbTitle="주말 테니스"
        mbDate="2024.03.22"
        endDate="2024.03.23"
        mbTime="14:00-16:00"
        mbLocation="역삼테니스장"
        currentMembers={10}
        maxParticipants={10}
        tags={['테니스', '주말운동', '마감임박']}
        domain="meeting"
      />
    </div>
  )
};

// 여러 태그를 가진 모임 카드
export const WithMultipleTags: Story = {
  args: {
    id: '4',
    mbTitle: '복합 운동 모임',
    mbDate: '2024.03.23',
    endDate: '2024.03.24',
    mbTime: '10:00-12:00',
    mbLocation: '종합스포츠센터',
    currentMembers: 8,
    maxParticipants: 15,
    tags: ['헬스', '요가', '초보환영', '전문강사', '주말운동', '정기모임'],
    image: '/jjang.jpeg',
    domain: 'meeting'
  }
};
