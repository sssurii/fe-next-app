import { routes } from "@/common/routes";
import { NotificationStatusTypesEnum } from "@/app/(protected)/settings/notifications/types";

const {
  read, unread,
} = NotificationStatusTypesEnum;

export const filterItems = [{
  id: '',
  label: 'All',
  href: routes.notificationsSettingsPath,
  'data-cy': 'all-notifications',
}, {
  id: read,
  label: 'Read',
  href: `${routes.notificationsSettingsPath}?filter=${read}`,
  'data-cy': 'read-notifications',
}, {
  id: unread,
  label: 'Unread',
  href: `${routes.notificationsSettingsPath}?filter=${unread}`,
  'data-cy': 'unread-notifications',
}]
