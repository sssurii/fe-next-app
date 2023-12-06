import type {
  Meta, StoryObj,
} from '@storybook/react';

import { NotificationList } from "@/common/components/organisms/flyoutMenu";

const meta: Meta<typeof NotificationList> = {
  title: 'Example/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    actionButtonCallbacks: {
      ProfileImageUploadNotification: () => false,
    },
    actionButtonTexts: {
      ProfileImageUploadNotification: 'Upload',
    },
    options: [{
      id: 'notification-1',
      created_at: '2021-09-30T10:00:00.000Z',
      data: {
        title: 'notification-1',
        message: 'Notification 1',
      },
      read_at: null,
      type: 'notification',
    }, {
      id: 'notification-2',
      created_at: '2021-09-30T10:00:00.000Z',
      data: {
        title: 'notification-2',
        message: 'Notification 2',
      },
      read_at: null,
      type: 'notification',
    }, {
      id: 'notification-3',
      created_at: '2021-09-30T10:00:00.000Z',
      data: {
        title: 'notification-3',
        message: 'Notification 3',
      },
      read_at: null,
      type: 'notification',
    }],
  },
}

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Default: Story = {};
export const WithTitle: Story = {
  args: {
    title: 'Notifications',
  },
}
export const WithTitleAndHeaderButton: Story = {
  args: {
    title: 'Notifications',
    headerButtonProps: {
      name: 'View all',
      onClick: () => false,
    },
  },
}


