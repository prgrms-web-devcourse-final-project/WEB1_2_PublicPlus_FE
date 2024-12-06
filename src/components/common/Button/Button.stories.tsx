import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  // 문서에서 보여줄 props 설명
  argTypes: {
    variant: {
      description: '버튼의 스타일을 결정합니다',
      options: ['primary', 'line', 'gray', 'badge'],
      control: { type: 'radio' }
    },
    size: {
      description: '버튼의 크기를 결정합니다',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    fullWidth: {
      description: '버튼의 너비를 100%로 설정합니다',
      control: { type: 'boolean' }
    },
    disabled: {
      description: '버튼의 비활성화 상태를 결정합니다',
      control: { type: 'boolean' }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼 variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '기본 버튼'
  }
};

export const Line: Story = {
  args: {
    variant: 'line',
    children: '라인 버튼'
  }
};

export const Gray: Story = {
  args: {
    variant: 'gray',
    children: '그레이 버튼'
  }
};

export const Badge: Story = {
  args: {
    variant: 'badge',
    children: '뱃지 버튼'
  }
};

// 크기별 버튼
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

// 너비 옵션
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼'
  }
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화 버튼'
  }
};

// 모든 variants 한번에 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="line">Line</Button>
        <Button variant="gray">Gray</Button>
        <Button variant="badge">Badge</Button>
      </div>
      <div className="flex gap-4">
        <Button
          variant="primary"
          disabled>
          Primary
        </Button>
        <Button
          variant="line"
          disabled>
          Line
        </Button>
        <Button
          variant="gray"
          disabled>
          Gray
        </Button>
        <Button
          variant="badge"
          disabled>
          Badge
        </Button>
      </div>
    </div>
  )
};

// 클릭 이벤트
export const WithClickHandler: Story = {
  args: {
    children: '클릭해보세요',
    onClick: () => alert('버튼이 클릭되었습니다!')
  }
};
