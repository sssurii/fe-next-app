import type {
  Meta, StoryObj,
} from '@storybook/react';

import { UserInitials } from "@/common/components/atoms";

const meta: Meta<typeof UserInitials> = {
  title: 'Example/UserInitials',
  component: UserInitials,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof UserInitials>;

export const Default: Story = {
  args: {
    initials: 'TK',
  },
}

export const WithIndicator: Story = {
  args: {
    initials: 'TK',
    showIndicator: true,
  },
}
