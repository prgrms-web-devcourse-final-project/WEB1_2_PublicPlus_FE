import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Common/Card',
  component: Card,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    color: {
      description: '카드의 배경색을 결정합니다',
      options: ['wh', 'sky'],
      control: { type: 'radio' }
    },
    title: {
      description: '카드의 제목을 설정합니다',
      control: 'text'
    },
    className: {
      description: '추가 스타일을 적용할 수 있습니다',
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 카드 예시들
export const CardExamples: Story = {
  render: () => (
    <section>
      <h2 className="mb-4 text-xl font-semibold">기본 카드</h2>
      <Card
        className="mb-8"
        title="카드 제목"
        imageSrc="/jjang.jpeg"
        content={
          <div>
            <p>카드 내용</p>
          </div>
        }
        footer={<div className="text-sm text-gray-500">추가 정보</div>}
      />
      <Card
        className="mb-8"
        title="하늘색 배경 카드"
        imageSrc="/jjang.jpeg"
        content={
          <div>
            <p>카드 내용</p>
          </div>
        }
        footer={<div className="text-sm text-gray-500">추가 정보</div>}
        color="sky"
      />
      <Card
        className="mb-8"
        title="이미지 없는 카드"
        content={
          <div>
            <p>카드 내용</p>
          </div>
        }
        footer={<div className="text-sm text-gray-500">추가 정보</div>}
        color="sky"
      />
    </section>
  )
};
