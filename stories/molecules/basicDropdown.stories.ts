import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Dropdown } from "@/common/components/molecules";

const meta: Meta<typeof Dropdown> = {
  title: 'Example/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    options: [{
      id: 'option_1',
      name: 'Option 1',
    }, {
      id: 'option_2',
      name: 'Option 2',
    }, {
      id: 'option_3',
      name: 'Option 3',
    }],
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {};
export const BasicDisabled: Story = {
  args: {
    disabled: true,
  },
}
