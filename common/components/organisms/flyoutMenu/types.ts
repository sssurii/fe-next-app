import {
  NotificationCallbacks, NotificationType,
} from "@/app/(protected)/settings/notifications/types";

export type NotificationOption = {
  id: string;
  created_at: string;
  data: {
    title: string;
    message: string;
  }
  read_at: string | null;
  type: string;
}

export type NotificationListProps = {
  /** Options for the flyout menu */
  options: NotificationOption[];
  /** The title for the flyout menu */
  title?: string;
  /** The function to update notification status */
  onUpdateNotificationsStatus: (id: string) => void;
  /** The text for button placed in menu header */
  headerButtonProps?: {
    name: string;
    onClick: () => void;
    disabled?: boolean;
  };
  /** The action button click handler */
  actionButtonCallbacks: NotificationCallbacks;
  /** The text for notification action button */
  actionButtonTexts: NotificationType;
}

export type NotificationsProps = {
  /** Options for the flyout menu */
  options: NotificationOption[];
  /** The function to update notification status */
  callback: (id: string) => void;
  /** The action button click handler */
  actionButtonCallbacks: NotificationCallbacks;
  /** The text for notification action button */
  actionButtonTexts: NotificationType;
}
