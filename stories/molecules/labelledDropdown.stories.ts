import type {
  Meta, StoryObj,
} from '@storybook/react';

import { LabelledDropdown } from "@/common/components/molecules";

const meta: Meta<typeof LabelledDropdown> = {
  title: 'Example/Dropdown',
  component: LabelledDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Options',
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
type Story = StoryObj<typeof LabelledDropdown>;

export const Labelled: Story = {};
export const LabelledDisabled: Story = {
  args: {
    disabled: true,
  },
}
