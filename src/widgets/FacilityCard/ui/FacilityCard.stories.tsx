import type { Meta, StoryObj } from '@storybook/react';
import { FacilityCard } from './FacilityCard';
import React from 'react';

const meta = {
  title: 'Common/Cards/FacilityCard',
  component: FacilityCard,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    reservationType: {
      description: '예약 방법을 설정합니다',
      options: ['국민체육센터', '주민센터 문의', '온라인 직접 예약'],
      control: { type: 'radio' }
    },
    tags: {
      description: '시설 관련 태그들을 설정합니다',
      control: 'object'
    },
    price: {
      description: '시설 이용 기본 요금을 설정합니다',
      control: 'text'
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
} satisfies Meta<typeof FacilityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 시설 카드
export const Default: Story = {
  args: {
    image: '/jjang.jpeg',
    title: '강남구민체육센터',
    price: '10,000원',
    tags: ['수영장', '헬스장', '주차가능'],
    reservationType: '국민체육센터',
    domain: 'facility',
    id: '1'
  }
};

// 예약 방법별 시설 카드
export const ReservationTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <FacilityCard
        image="/jjang.jpeg"
        title="서초구민체육센터"
        price="8,000원"
        tags={['테니스장', '주차가능']}
        reservationType="국민체육센터"
        domain="facility"
        id="2"
      />
      <FacilityCard
        image="/jjang.jpeg"
        title="역삼동주민센터"
        price="5,000원"
        tags={['탁구장', '배드민턴장']}
        reservationType="주민센터 문의"
        domain="facility"
        id="3"
      />
      <FacilityCard
        image="/jjang.jpeg"
        title="강남스포츠컴플렉스"
        price="15,000원"
        tags={['수영장', '헬스장', '요가실', '주차가능']}
        reservationType="온라인 직접 예약"
        domain="facility"
        id="4"
      />
    </div>
  )
};

// 다양한 태그를 가진 시설 카드
export const WithMultipleTags: Story = {
  args: {
    image: '/jjang.jpeg',
    title: '종합스포츠센터',
    price: '12,000원',
    tags: ['수영장', '헬스장', '요가실', '주차가능', '샤워실', '락커룸'],
    reservationType: '온라인 직접 예약',
    domain: 'facility',
    id: '5'
  }
};

// 그리드 레이아웃 예시
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <FacilityCard
        image="/jjang.jpeg"
        title="시설 A"
        price="10,000원"
        tags={['수영장', '주차가능']}
        reservationType="국민체육센터"
        domain="facility"
        id="6"
      />
      <FacilityCard
        image="/jjang.jpeg"
        title="시설 B"
        price="8,000원"
        tags={['헬스장', '요가실']}
        reservationType="온라인 직접 예약"
        domain="facility"
        id="7"
      />
    </div>
  )
};
