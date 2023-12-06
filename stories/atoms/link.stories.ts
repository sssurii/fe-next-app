import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Link } from "@/common/components/atoms";

const meta: Meta<typeof Link> = {
  title: 'Example/Link',
  component: Link,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof Link>;

export const Outlined: Story = {
  args: {
    href: '#',
    variant: 'outlined',
    children: 'Link',
  },
}
