import type { Meta, StoryObj } from '@storybook/react';
import { LinkCard } from './LinkCard';
import { Tag } from '../Tag/Tag';
import React from 'react';

const meta = {
  title: 'Common/Cards/LinkCard',
  component: LinkCard,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    color: {
      description: '카드의 배경색',
      options: ['wh', 'sky'],
      control: { type: 'radio' }
    },
    domain: {
      description: '링크의 도메인 경로',
      control: 'text'
    },
    id: {
      description: '링크의 ID',
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
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 링크 카드
export const Default: Story = {
  args: {
    title: '시설명',
    imageSrc: '/jjang.jpeg',
    domain: 'facility',
    id: '1',
    content: <p>시설 상세 정보</p>,
    footer: <p className="text-sm text-gray-500">추가 정보</p>
  }
};

// 태그가 있는 링크 카드
export const WithTags: Story = {
  args: {
    title: '체육 시설',
    imageSrc: '/jjang.jpeg',
    domain: 'facility',
    id: '2',
    content: (
      <div className="flex flex-wrap gap-1">
        <Tag label="수영장" />
        <Tag label="주차가능" />
        <Tag label="샤워실" />
      </div>
    ),
    footer: <p className="text-sm text-gray-500">예약 가능</p>
  }
};

// 배경색 변형
export const WithSkyBackground: Story = {
  args: {
    title: '하늘색 배경 카드',
    imageSrc: '/jjang.jpeg',
    domain: 'facility',
    id: '3',
    color: 'sky',
    content: <p>카드 내용</p>,
    footer: <p className="text-sm text-gray-500">푸터 내용</p>
  }
};

// 여러 카드 레이아웃
export const CardLayout: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <LinkCard
        title="시설 A"
        imageSrc="/jjang.jpeg"
        domain="facility"
        id="4"
        content={<p>시설 A 정보</p>}
      />
      <LinkCard
        title="시설 B"
        imageSrc="/jjang.jpeg"
        domain="facility"
        id="5"
        content={<p>시설 B 정보</p>}
        color="sky"
      />
    </div>
  )
};
