'use client';
import { useRouter } from "next/navigation";
import { useLogout } from "@/common/utils/hooks";
import { routes } from "@/common/routes";
import { useGetUserDetails } from "@/app/(protected)/settings/general/userInformation/hooks";
import {
  useGetInfiniteNotifications,
  useGetNotifications,
  useNotifications,
} from "@/app/(protected)/settings/notifications/hooks";
import { useFeatureFlag } from "@/common/utils/hooks/useFeatureFlag";
import { LogicLessHeader } from "@/common/components/organisms/header/logiclessHeader";
import { NotificationStatusTypesEnum } from "@/app/(protected)/settings/notifications/types";
import lang from "@/common/lang";

const { header } = lang;

export const Header = () => {
  const { handleLogout } = useLogout();
  const router = useRouter();
  const { userDetails } = useGetUserDetails();
  const {
    onUpdateNotificationsStatus, isUpdatingNotificationStatus, actionButtonCallbacks, actionButtonTexts,
  } = useNotifications();
  const { mutateNotificationsInfiniteList } = useGetInfiniteNotifications();
  const {
    notificationsList, notificationsLoader,
  } = useGetNotifications(NotificationStatusTypesEnum.unread);
  const options = [
    {
      id: 'general-settings',
      name: header.settings,
      onClick: () =>  router.push(routes.generalSettingsPath),
    }, {
      id: 'logout',
      name: header.logout,
      onClick: handleLogout,
    },
  ]

  const showNotificationsFeature = useFeatureFlag("notificationsFeatureEnabled");

  return <LogicLessHeader
    showNotificationsFeature={showNotificationsFeature}
    notificationsList={notificationsList}
    onUpdateNotificationsStatus={onUpdateNotificationsStatus}
    mutateNotificationsInfiniteList={mutateNotificationsInfiniteList}
    notificationsLoader={notificationsLoader}
    isUpdatingNotificationStatus={isUpdatingNotificationStatus}
    router={router}
    handleLogout={handleLogout}
    options={options}
    userImage={userDetails?.image}
    actionButtonCallbacks={actionButtonCallbacks}
    actionButtonTexts={actionButtonTexts}
  />
}
