import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Input } from '@/common/components/molecules';
import { SearchIcon } from "@/common/components/icons";

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Input',
    width: 'w-60',
  },
}

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {}
export const PrimaryWithIcon: Story = {
  args: {
    icon: SearchIcon,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
export const Labelled: Story = {
  args: {
    labelText: 'Label',
  },
}
export const WithOptionalText: Story = {
  args: {
    optionalText: 'Optional',
  },
}
export const WithOptionalJsxElement: Story = {
  args: {
    optionalText: <span className="hidden lg:inline text-sm text-brand-500 hover:text-brand-300">Optional link</span>,
  },
}
export const LabelledWithOptionalText: Story = {
  args: {
    labelText: 'Label',
    optionalText: 'Optional',
  },
}
export const LabelledWithOptionalJsxElement: Story = {
  args: {
    labelText: 'Label',
    optionalText: <span className="hidden lg:inline text-sm text-brand-500 hover:text-brand-300">Optional link</span>,
  },
}

export const PrimaryWithError: Story = {
  args: {
    error: true,
    errorMessage: 'Error',
  },
}

export const LabelledWithError: Story = {
  args: {
    labelText: 'Label',
    error: true,
    errorMessage: 'Error',
  },
}
