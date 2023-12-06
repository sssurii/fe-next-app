import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Warning } from '@/common/components/atoms';

const meta: Meta<typeof Warning> = {
  title: 'Example/Warning',
  component: Warning,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof Warning>;

export const Default: Story = {};
export const DefaultWithIndicator: Story = {
  args: {
    showIndicator: true,
  },
}
