import { SVGProps } from 'react';
import { NotificationOption } from "@/common/components/organisms/flyoutMenu/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  NotificationCallbacks, NotificationType,
} from "@/app/(protected)/settings/notifications/types";

export type HeaderProps = {
  showNotificationsFeature: boolean;
  notificationsList: NotificationOption[];
  onUpdateNotificationsStatus:  (id: (string), mutateNotificationsInfiniteList: () => any) => Promise<void>;
  mutateNotificationsInfiniteList: () => any;
  notificationsLoader: boolean;
  isUpdatingNotificationStatus: boolean;
  router: AppRouterInstance;
  handleLogout: () => void;
  options: MenuOption[];
  userImage?: string;
  actionButtonCallbacks: NotificationCallbacks;
  actionButtonTexts: NotificationType;
}

export type MenuOption = {
  id: string;
  name: string;
  onClick?: () => void;
}

export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export type MenuProps = {
  options: MenuOption[];
  userAvatarImage: IconComponent;
}

export type MobileMenuProps = Omit<MenuProps, 'options'> & {
  openMobileMenu: () => void;
}

