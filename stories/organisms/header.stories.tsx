import type {
  Meta, StoryObj,
} from '@storybook/react';

import { LogicLessHeader } from '@/common/components/organisms/header';

const meta: Meta<typeof LogicLessHeader> = {
  title: 'Example/Header',
  component: LogicLessHeader,
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogicLessHeader>;
export const HeaderStory: Story = {
  args: {
    showNotificationsFeature: true,
    actionButtonCallbacks: {
      ProfileImageUploadNotification: () => false,
    },
    actionButtonTexts: {
      ProfileImageUploadNotification: 'Upload',
    },
    notificationsList: [{
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
    onUpdateNotificationsStatus: (() => false) as any,
    mutateNotificationsInfiniteList: () => false,
    isUpdatingNotificationStatus: false,
    router: {
      push: () => false,
    } as any,
  },
};
