import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Table } from "@/common/components/organisms/table";

const meta: Meta<typeof Table> = {
  title: 'Example/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const TableStory: Story = {
  args: {
    columns: [
      {
        key: 'name',
        value: 'Name',
        isSortable: true,
      } ,
      {
        key: 'title',
        value: 'Title',
        isSortable: true,
      },
      {
        key: 'email',
        value: 'Email',
        isSortable: false,
      },
      {
        key: 'role',
        value: 'Role',
        isSortable: false,
      },
      {
        key: 'birthday',
        value: 'Birthday',
        isSortable: false,
      },
    ],
    data: [
      {
        id: 1,
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        email: 'jane@yopmail.com',
        role: 'Admin',
        birthday: '10 September',
      },
      {
        id: 2,
        name: 'Cody Fisher',
        title: 'Product Directives Officer',
        email: 'cody@yopmail.com',
        role: 'Owner',
        birthday: '10 September',
      },
      {
        id: 3,
        name: 'Esther Howard',
        title: 'Forward Response Developer',
        email: 'esther@yopmail.com',
        role: 'Member',
        birthday: '10 September',
      },
      {
        id: 4,
        name: 'Jenny Wilson',
        title: 'Central Security Manager',
        email: 'jenny@yopmail.com',
        role: 'Member',
        birthday: '10 September',
      },
      {
        id: 5,
        name: 'Kristin Watson',
        title: 'Lead Implementation Liaison',
        email: 'watson@yopmail.com',
        role: 'Admin',
        birthday: '10 September',
      },
    ],
  },
}
